<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrivateProduct;
use App\Models\PrivateOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PrivateProductController extends Controller
{
    /**
     * Display a listing of digital products with financial tracking analytics.
     */
    public function index()
    {
        $products = PrivateProduct::withCount('orders')
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate Global Financial Analytics
        $totalOrdersRevenue = PrivateOrder::where('payment_status', 'completed')->sum('amount');
        
        // Fallback to estimated revenue from product sales_count if test orders are minimal
        $estimatedProductsRevenue = $products->sum(function ($p) {
            return $p->sales_count * $p->price;
        });

        $totalRevenue = max($totalOrdersRevenue, $estimatedProductsRevenue);
        $totalAdSpend = $products->sum('ad_spend');
        $netProfit = $totalRevenue - $totalAdSpend;
        $totalSales = max(PrivateOrder::where('payment_status', 'completed')->count(), $products->sum('sales_count'));
        $totalViews = $products->sum('views_count');
        $overallConversionRate = $totalViews > 0 ? round(($totalSales / $totalViews) * 100, 2) : 0;

        // Sales vs Ad Spend chart data per product
        $chartData = $products->map(function ($product) {
            $revenue = $product->sales_count * $product->price;
            return [
                'name' => Str::limit($product->title, 20),
                'revenue' => $revenue,
                'ad_spend' => (float)$product->ad_spend,
                'profit' => $revenue - $product->ad_spend,
                'sales' => $product->sales_count,
                'views' => $product->views_count,
            ];
        });

        return Inertia::render('Admin/PrivateProducts/Index', [
            'products' => $products,
            'stats' => [
                'total_revenue' => $totalRevenue,
                'total_ad_spend' => $totalAdSpend,
                'net_profit' => $netProfit,
                'total_sales' => $totalSales,
                'total_views' => $totalViews,
                'conversion_rate' => $overallConversionRate,
            ],
            'chartData' => $chartData,
        ]);
    }

    /**
     * Show creation form.
     */
    public function create()
    {
        return Inertia::render('Admin/PrivateProducts/Create');
    }

    /**
     * Store a newly created digital product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'ad_spend' => 'nullable|numeric|min:0',
            'access_type' => 'required|in:drive,direct_download',
            'access_url' => 'required_if:access_type,drive|nullable|string|max:1000',
            'tagline' => 'required|string|max:500',
            'description_markdown' => 'nullable|string',
            'badge_text' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'features' => 'nullable|array',
            'curriculum' => 'nullable|array',
            // Image uploads
            'images' => 'required|array|min:1|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            // Digital file upload
            'digital_file' => 'required_if:access_type,direct_download|nullable|file|max:102400',
        ]);

        // Generate Obfuscated Slug & Access Token
        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        $validated['token'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['ad_spend'] = $validated['ad_spend'] ?? 0;

        // Handle Images upload
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products/images', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }

        $validated['cover_image'] = $imagePaths[0] ?? null;
        $validated['images'] = $imagePaths;

        // Handle Secure digital file upload
        if ($request->hasFile('digital_file') && $validated['access_type'] === 'direct_download') {
            $path = $request->file('digital_file')->store('private/products/files', 'local');
            $validated['file_path'] = $path;
        }

        PrivateProduct::create($validated);

        return redirect()->route('admin.private-products.index')->with('success', 'Produit digital créé avec succès !');
    }

    /**
     * Show editing form.
     */
    public function edit(PrivateProduct $privateProduct)
    {
        return Inertia::render('Admin/PrivateProducts/Edit', [
            'product' => $privateProduct,
        ]);
    }

    /**
     * Update the specified digital product in storage.
     */
    public function update(Request $request, PrivateProduct $privateProduct)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'ad_spend' => 'nullable|numeric|min:0',
            'access_type' => 'required|in:drive,direct_download',
            'access_url' => 'required_if:access_type,drive|nullable|string|max:1000',
            'tagline' => 'required|string|max:500',
            'description_markdown' => 'nullable|string',
            'badge_text' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'features' => 'nullable|array',
            'curriculum' => 'nullable|array',
            // Image uploads are optional on update
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            // Digital file upload is optional on update
            'digital_file' => 'nullable|file|max:102400',
        ]);

        // Handle Images upload
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products/images', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
            $validated['cover_image'] = $imagePaths[0];
            $validated['images'] = $imagePaths;
        }

        // Handle Secure digital file upload
        if ($request->hasFile('digital_file') && $validated['access_type'] === 'direct_download') {
            $path = $request->file('digital_file')->store('private/products/files', 'local');
            $validated['file_path'] = $path;
        }

        $privateProduct->update($validated);

        return redirect()->route('admin.private-products.index')->with('success', 'Produit digital mis à jour avec succès !');
    }

    /**
     * Remove the specified digital product from storage.
     */
    public function destroy(PrivateProduct $privateProduct)
    {
        // Delete uploaded files if they exist
        if ($privateProduct->images) {
            foreach ($privateProduct->images as $img) {
                $cleanPath = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($cleanPath);
            }
        }

        if ($privateProduct->file_path) {
            Storage::disk('local')->delete($privateProduct->file_path);
        }

        $privateProduct->delete();

        return redirect()->route('admin.private-products.index')->with('success', 'Produit digital supprimé avec succès.');
    }
}

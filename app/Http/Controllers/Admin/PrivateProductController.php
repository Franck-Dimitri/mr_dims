<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrivateProduct;
use App\Models\PrivateOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
        $totalOrdersRevenue = PrivateOrder::where('status', 'completed')->sum('amount');
        
        // Fallback to estimated revenue from product sales_count if test orders are minimal
        $estimatedProductsRevenue = $products->sum(function ($p) {
            return $p->sales_count * $p->price;
        });

        $totalRevenue = max($totalOrdersRevenue, $estimatedProductsRevenue);
        $totalAdSpend = $products->sum('ad_spend');
        $netProfit = $totalRevenue - $totalAdSpend;
        $totalSales = max(PrivateOrder::where('status', 'completed')->count(), $products->sum('sales_count'));
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
            'access_url' => 'required|string|max:1000',
            'tagline' => 'required|string|max:500',
            'description_markdown' => 'nullable|string',
            'cover_image' => 'nullable|string|max:1000',
            'preview_video_url' => 'nullable|string|max:1000',
            'access_details' => 'nullable|string|max:1000',
            'features' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'badge_text' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        $validated['token'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['ad_spend'] = $validated['ad_spend'] ?? 0;
        $validated['cover_image'] = $validated['cover_image'] ?? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

        PrivateProduct::create($validated);

        return redirect()->back()->with('success', 'Produit digital créé avec succès !');
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
            'access_url' => 'required|string|max:1000',
            'tagline' => 'required|string|max:500',
            'description_markdown' => 'nullable|string',
            'cover_image' => 'nullable|string|max:1000',
            'preview_video_url' => 'nullable|string|max:1000',
            'access_details' => 'nullable|string|max:1000',
            'features' => 'nullable|array',
            'curriculum' => 'nullable|array',
            'badge_text' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $privateProduct->update($validated);

        return redirect()->back()->with('success', 'Produit digital mis à jour avec succès !');
    }

    /**
     * Remove the specified digital product from storage.
     */
    public function destroy(PrivateProduct $privateProduct)
    {
        $privateProduct->delete();

        return redirect()->back()->with('success', 'Produit digital supprimé avec succès.');
    }
}

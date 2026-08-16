<?php

namespace App\Http\Controllers;

use App\Models\PrivateProduct;
use App\Models\PrivateOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PrivateOfferController extends Controller
{
    /**
     * Display main private catalog index with token obfuscation.
     */
    public function index(Request $request, $token = null)
    {
        $products = PrivateProduct::where('is_active', true)
            ->orderBy('is_featured', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $response = Inertia::render('Private/Index', [
            'products' => $products,
            'accessToken' => $token ?? 'vault-access',
        ])->toResponse($request);

        $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');

        return $response;
    }

    /**
     * Display a specific private product page.
     */
    public function show(Request $request, $slug, $token)
    {
        $product = PrivateProduct::where('slug', $slug)
            ->where('token', $token)
            ->where('is_active', true)
            ->firstOrFail();

        $product->increment('views_count');

        $relatedProducts = PrivateProduct::where('is_active', true)
            ->where('id', '!=', $product->id)
            ->take(2)
            ->get();

        $response = Inertia::render('Private/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'token' => $token,
        ])->toResponse($request);

        $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');

        return $response;
    }

    /**
     * Display checkout page for a product.
     */
    public function checkout(Request $request, $slug, $token)
    {
        $product = PrivateProduct::where('slug', $slug)
            ->where('token', $token)
            ->where('is_active', true)
            ->firstOrFail();

        $response = Inertia::render('Private/Checkout', [
            'product' => $product,
            'token' => $token,
        ])->toResponse($request);

        $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');

        return $response;
    }

    /**
     * Process checkout form submission.
     */
    public function processCheckout(Request $request, $slug, $token)
    {
        $product = PrivateProduct::where('slug', $slug)
            ->where('token', $token)
            ->where('is_active', true)
            ->firstOrFail();

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:30',
            'country' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'payment_method' => 'required|string|in:orange_money,mtn_momo,wave,card',
            'notes' => 'nullable|string|max:500',
        ]);

        $orderHash = 'ORD-' . strtoupper(Str::random(10));
        $txRef = 'TX-' . time() . '-' . rand(100, 999);

        $order = PrivateOrder::create([
            'order_hash' => $orderHash,
            'private_product_id' => $product->id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'country' => $validated['country'],
            'city' => $validated['city'],
            'amount' => $product->price,
            'currency' => 'FCFA',
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'completed',
            'transaction_reference' => $txRef,
            'notes' => $validated['notes'] ?? null,
            'paid_at' => now(),
        ]);

        $product->increment('sales_count');

        return redirect()->route('private.success', ['order_hash' => $orderHash]);
    }

    /**
     * Display order success & product download/access details.
     */
    public function success(Request $request, $order_hash)
    {
        $order = PrivateOrder::with('product')
            ->where('order_hash', $order_hash)
            ->firstOrFail();

        $response = Inertia::render('Private/Success', [
            'order' => $order,
            'product' => $order->product,
        ])->toResponse($request);

        $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');

        return $response;
    }
}

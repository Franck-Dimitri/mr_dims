<?php

namespace App\Http\Controllers;

use App\Models\PrivateProduct;
use App\Models\PrivateOrder;
use App\Services\HRSkillsPayService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PrivateOfferController extends Controller
{
    protected HRSkillsPayService $payService;

    public function __construct(HRSkillsPayService $payService)
    {
        $this->payService = $payService;
    }

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

        $orderHash = $request->query('order_hash');
        $waiting = $request->query('waiting') === '1';

        $response = Inertia::render('Private/Checkout', [
            'product' => $product,
            'token' => $token,
            'orderHash' => $orderHash,
            'waitingPayment' => $waiting,
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
            'payment_method' => 'required|string|in:orange_money,mtn_momo,wave',
            'notes' => 'nullable|string|max:500',
        ]);

        // Country Mapping & Configuration
        $countryMap = [
            "Côte d'Ivoire" => ['code' => 'CI', 'currency' => 'XOF', 'prefix' => '225'],
            "Sénégal"       => ['code' => 'SN', 'currency' => 'XOF', 'prefix' => '221'],
            "Cameroun"      => ['code' => 'CM', 'currency' => 'XAF', 'prefix' => '237'],
            "Mali"          => ['code' => 'ML', 'currency' => 'XOF', 'prefix' => '223'],
            "Burkina Faso"  => ['code' => 'BF', 'currency' => 'XOF', 'prefix' => '226'],
            "Bénin"         => ['code' => 'BJ', 'currency' => 'XOF', 'prefix' => '229'],
            "Togo"          => ['code' => 'TG', 'currency' => 'XOF', 'prefix' => '228'],
            "Guinée"        => ['code' => 'GN', 'currency' => 'GNF', 'prefix' => '224'],
            "Congo"         => ['code' => 'CD', 'currency' => 'CDF', 'prefix' => '243'],
            "Gabon"         => ['code' => 'GA', 'currency' => 'XAF', 'prefix' => '241'],
        ];

        $countryName = $validated['country'];
        $countryMeta = $countryMap[$countryName] ?? ['code' => 'CI', 'currency' => 'XOF', 'prefix' => '225'];

        // Clean & Format phone number (ex: remove '+', spaces, prepending country prefix if missing)
        $cleanPhone = preg_replace('/[^0-9]/', '', $validated['customer_phone']);
        $prefix = $countryMeta['prefix'];
        if (!str_starts_with($cleanPhone, $prefix)) {
            $cleanPhone = $prefix . ltrim($cleanPhone, '0');
        }

        // Map Payment method selection to HR-Skills Pay Operator Code
        $operatorMap = [
            'orange_money' => 'orange',
            'mtn_momo' => 'mtn',
            'wave' => 'wave',
        ];
        $operator = $operatorMap[$validated['payment_method']] ?? 'orange';

        $orderHash = 'ORD-' . strtoupper(Str::random(10));

        // Create Pending Order
        $order = PrivateOrder::create([
            'order_hash' => $orderHash,
            'private_product_id' => $product->id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $cleanPhone,
            'country' => $countryName,
            'city' => $validated['city'],
            'amount' => $product->price,
            'currency' => $countryMeta['currency'],
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'pending',
            'transaction_reference' => 'TEMP-' . time(),
            'notes' => $validated['notes'] ?? null,
        ]);

        // Initiate cash-in via HR-Skills Pay API
        $result = $this->payService->initiateCashIn(
            $cleanPhone,
            $operator,
            $product->price,
            $countryMeta['currency'],
            $countryMeta['code'],
            $orderHash
        );

        if ($result['success']) {
            // Retrieve transaction reference from response
            $txRef = $result['data']['reference'] ?? $result['data']['transaction_id'] ?? 'ref_' . time();
            $order->update([
                'transaction_reference' => $txRef,
            ]);

            // Redirect back with order_hash & waiting parameters for visual polling screen
            return redirect()->route('private.checkout', [
                'slug' => $slug,
                'token' => $token,
                'order_hash' => $orderHash,
                'waiting' => 1
            ]);
        }

        // Cleanup pending order if initiation failed
        $order->delete();

        return back()->withErrors([
            'customer_phone' => 'Le paiement n\'a pas pu être initié : ' . ($result['message'] ?? 'Erreur inconnue.')
        ]);
    }

    /**
     * Polling check status route.
     */
    public function checkStatus(Request $request, $order_hash)
    {
        try {
            $order = PrivateOrder::where('order_hash', $order_hash)->firstOrFail();

            if ($order->payment_status === 'completed') {
                return response()->json(['status' => 'SUCCESS']);
            }

            if ($order->payment_status === 'failed') {
                return response()->json(['status' => 'FAILED']);
            }

            // Call Service to poll status
            $result = $this->payService->getPaymentStatus($order->transaction_reference);

            if ($result['success']) {
                $apiStatus = strtoupper($result['status']);

                if ($apiStatus === 'SUCCESS') {
                    $order->update([
                        'payment_status' => 'completed',
                        'paid_at' => now(),
                    ]);

                    // Increment product sales count
                    $order->product->increment('sales_count');

                    return response()->json(['status' => 'SUCCESS']);
                }

                if ($apiStatus === 'FAILED' || $apiStatus === 'TIMEOUT') {
                    $order->update([
                        'payment_status' => 'failed',
                    ]);
                    return response()->json(['status' => 'FAILED']);
                }
            }

            return response()->json(['status' => 'PENDING']);
        } catch (\Exception $e) {
            Log::error('checkStatus Exception: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            throw $e;
        }
    }

    /**
     * Webhook Endpoint.
     */
    public function handleWebhook(Request $request)
    {
        Log::info('HR-Skills Pay Webhook received', $request->all());

        $signature = $request->header('X-Hub-Signature');
        $payload = $request->getContent();
        $secret = config('services.hrskills_pay.secret_key');

        // Optional signature verification
        if ($signature && $secret) {
            $expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);
            if (!hash_equals($expected, $signature)) {
                Log::warning('HR-Skills Pay Webhook Invalid Signature');
                return response()->json(['error' => 'Signature invalide'], 401);
            }
        }

        $event = $request->input('event');
        $data = $request->input('data', []);
        $reference = $data['reference'] ?? null;
        $status = strtoupper($data['status'] ?? '');

        if (!$reference) {
            return response()->json(['error' => 'Référence manquante'], 400);
        }

        $order = PrivateOrder::where('transaction_reference', $reference)->first();

        if (!$order) {
            // Fallback lookup by order_hash if reference matches reference structure
            $order = PrivateOrder::where('order_hash', $reference)->first();
        }

        if ($order) {
            if ($event === 'payment.succeeded' || $status === 'SUCCESS') {
                if ($order->payment_status !== 'completed') {
                    $order->update([
                        'payment_status' => 'completed',
                        'paid_at' => now(),
                    ]);
                    $order->product->increment('sales_count');
                }
            } elseif ($event === 'payment.failed' || $status === 'FAILED') {
                $order->update([
                    'payment_status' => 'failed',
                ]);
            }
        }

        return response()->json(['success' => true]);
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

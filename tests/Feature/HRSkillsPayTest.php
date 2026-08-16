<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\PrivateProduct;
use App\Models\PrivateOrder;
use App\Services\HRSkillsPayService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

class HRSkillsPayTest extends TestCase
{
    use RefreshDatabase;

    public function test_auth_retrieves_transaction_token()
    {
        // Mock HR-Skills Pay authentication
        Http::fake([
            'https://api.hrskills-pay.com/v1/auth/transaction-token' => Http::response([
                'transaction_token' => 'mock_jwt_token_123',
                'expires_in' => 2700,
            ], 200),
        ]);

        $service = new HRSkillsPayService();
        $token = $service->getTransactionToken();

        $this->assertEquals('mock_jwt_token_123', $token);
    }

    public function test_initiate_cashin_calls_api_successfully()
    {
        // Mock token and cash-in calls
        Http::fake([
            'https://api.hrskills-pay.com/v1/auth/transaction-token' => Http::response([
                'transaction_token' => 'mock_jwt_token_123',
            ], 200),
            'https://api.hrskills-pay.com/api/v1/payin/mobile-money' => Http::response([
                'success' => true,
                'data' => [
                    'transaction_id' => 'mock-tx-uuid-456',
                    'reference' => 'ref_mock123',
                    'status' => 'PENDING',
                ]
            ], 202),
        ]);

        $service = new HRSkillsPayService();
        $result = $service->initiateCashIn(
            '2250700000000',
            'orange',
            100.00,
            'XOF',
            'CI',
            'ORD-TEST123'
        );

        $this->assertTrue($result['success']);
        $this->assertEquals('ref_mock123', $result['data']['reference']);
    }

    public function test_check_status_completes_order_on_success()
    {
        $product = PrivateProduct::create([
            'title' => 'Test Product',
            'slug' => 'test-product',
            'token' => 'test-token',
            'category' => 'ebook_guide',
            'price' => 100.00,
            'tagline' => 'Test Tagline',
        ]);

        $order = PrivateOrder::create([
            'order_hash' => 'ORD-123',
            'private_product_id' => $product->id,
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'customer_phone' => '2250700000000',
            'country' => "Côte d'Ivoire",
            'city' => 'Abidjan',
            'amount' => 100.00,
            'currency' => 'XOF',
            'payment_method' => 'orange_money',
            'payment_status' => 'pending',
            'transaction_reference' => 'ref_mock123',
        ]);

        // Mock token and payment status calls
        Http::fake([
            'https://api.hrskills-pay.com/v1/auth/transaction-token' => Http::response([
                'transaction_token' => 'mock_jwt_token_123',
            ], 200),
            'https://api.hrskills-pay.com/v1/payments/ref_mock123' => Http::response([
                'status' => 'SUCCESS',
            ], 200),
        ]);

        $this->withoutExceptionHandling();
        $response = $this->get(route('private.status', ['order_hash' => 'ORD-123']));

        $response->assertStatus(200);
        $response->assertJson(['status' => 'SUCCESS']);

        $this->assertEquals('completed', $order->fresh()->payment_status);
        $this->assertEquals(1, $product->fresh()->sales_count);
    }
}

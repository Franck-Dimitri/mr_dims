<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class HRSkillsPayService
{
    protected string $baseUrl;
    protected string $publicKey;
    protected string $secretKey;

    public function __construct()
    {
        $this->baseUrl = config('services.hrskills_pay.base_url', 'https://api.hrskills-pay.com');
        $this->publicKey = config('services.hrskills_pay.public_key', '');
        $this->secretKey = config('services.hrskills_pay.secret_key', '');
    }

    /**
     * Retrieve a cached Transaction Token (JWT) or request a new one from HR-Skills Pay.
     */
    public function getTransactionToken(): ?string
    {
        return Cache::remember('hrskills_pay_transaction_token', 2400, function () {
            try {
                $response = Http::withHeaders([
                    'Authorization' => "Bearer {$this->publicKey}",
                    'Content-Type' => 'application/json',
                ])->post("{$this->baseUrl}/v1/auth/transaction-token", [
                    'api_secret' => $this->secretKey,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    return $data['transaction_token'] ?? null;
                }

                Log::error('HR-Skills Pay Auth Error: ' . $response->body());
                return null;
            } catch (\Exception $e) {
                Log::error('HR-Skills Pay Auth Exception: ' . $e->getMessage());
                return null;
            }
        });
    }

    /**
     * Initiate a Mobile Money Cash-In.
     */
    public function initiateCashIn(string $phone, string $operator, float $amount, string $currency, string $country, string $reference): array
    {
        $token = $this->getTransactionToken();

        if (!$token) {
            return [
                'success' => false,
                'message' => 'Impossible d\'obtenir le jeton de transaction de paiement.'
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->publicKey}",
                'X-Transaction-Token' => $token,
                'Idempotency-Key' => $reference,
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/api/v1/payin/mobile-money", [
                'operator' => strtolower($operator),
                'country' => strtoupper($country),
                'phone_number' => $phone,
                'amount' => (int) $amount,
                'currency' => strtoupper($currency),
            ]);

            if ($response->successful() || $response->status() === 202) {
                return [
                    'success' => true,
                    'data' => $response->json()['data'] ?? $response->json()
                ];
            }

            Log::error('HR-Skills Pay CashIn Error: ' . $response->body());
            return [
                'success' => false,
                'message' => $response->json()['message'] ?? 'Erreur lors de l\'initiation du paiement.',
                'raw' => $response->json()
            ];
        } catch (\Exception $e) {
            Log::error('HR-Skills Pay CashIn Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Une exception est survenue lors de l\'initiation du paiement : ' . $e->getMessage()
            ];
        }
    }

    /**
     * Poll/Query payment transaction status.
     */
    public function getPaymentStatus(string $reference): array
    {
        $token = $this->getTransactionToken();

        if (!$token) {
            return [
                'success' => false,
                'message' => 'Impossible d\'obtenir le jeton de transaction.'
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->publicKey}",
                'X-Transaction-Token' => $token,
            ])->get("{$this->baseUrl}/v1/payments/{$reference}");

            if ($response->successful()) {
                return [
                    'success' => true,
                    'status' => $response->json()['status'] ?? $response->json()['data']['status'] ?? 'PENDING',
                    'raw' => $response->json()
                ];
            }

            Log::error('HR-Skills Pay Status Check Error: ' . $response->body());
            return [
                'success' => false,
                'message' => 'Impossible d\'interroger le statut de la transaction.',
                'raw' => $response->json()
            ];
        } catch (\Exception $e) {
            Log::error('HR-Skills Pay Status Check Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Erreur lors de l\'interrogation de la transaction : ' . $e->getMessage()
            ];
        }
    }
}

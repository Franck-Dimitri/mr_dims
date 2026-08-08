<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    /**
     * Envoie un message formaté en HTML sur le canal Telegram configuré.
     */
    public static function sendMessage(string $message): bool
    {
        $botToken = env('TELEGRAM_BOT_TOKEN', '8466581165:AAFxKL5Qzm8tmnWnIFx3f0LKiayEM6UI6Jg');
        $chatId = env('TELEGRAM_CHAT_ID', '5304699380');

        if (empty($botToken) || empty($chatId)) {
            return false;
        }

        try {
            $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
            $response = Http::timeout(5)->post($url, [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
                'disable_web_page_preview' => true,
            ]);

            return $response->successful();
        } catch (\Throwable $e) {
            Log::error("Échec de l'envoi de la notification Telegram : " . $e->getMessage());
            return false;
        }
    }
}

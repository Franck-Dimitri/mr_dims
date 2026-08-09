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
        $botToken = config('services.telegram-bot.token') ?? env('TELEGRAM_BOT_TOKEN');
        $chatId = config('services.telegram-bot.chat_id') ?? env('TELEGRAM_CHAT_ID');

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

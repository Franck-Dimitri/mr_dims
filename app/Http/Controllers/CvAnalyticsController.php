<?php

namespace App\Http\Controllers;

use App\Models\CvAnalytic;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CvAnalyticsController extends Controller
{
    /**
     * Enregistre un événement de CV (view_modal, download_pdf, view_image)
     * et alerte en temps réel via le Bot Telegram.
     */
    public function track(Request $request)
    {
        $validated = $request->validate([
            'event_type' => 'required|string|in:view_modal,download_pdf,view_image',
        ]);

        $eventType = $validated['event_type'];
        $ip = $request->ip();
        $userAgent = substr($request->userAgent() ?? 'Inconnu', 0, 150);

        try {
            CvAnalytic::create([
                'event_type' => $eventType,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
            ]);

            // Formater le message Telegram selon le type d'événement
            $eventLabels = [
                'download_pdf' => '📥 <b>TÉLÉCHARGEMENT CV PDF</b>',
                'view_modal' => '👁️ <b>CONSULTATION MODALE CV</b>',
                'view_image' => '🖼️ <b>APERÇU IMAGE DU CV</b>',
            ];

            $actionText = [
                'download_pdf' => 'Un visiteur vient de télécharger votre CV au format PDF !',
                'view_modal' => 'La modale de votre CV vient d\'être ouverte.',
                'view_image' => 'L\'onglet aperçu image du CV a été affiché.',
            ];

            $label = $eventLabels[$eventType] ?? '📄 <b>INTERACTION CV</b>';
            $text = $actionText[$eventType] ?? 'Une interaction avec votre CV a été enregistrée.';
            $time = now()->format('d/m/Y à H:i:s');

            $telegramMessage = "{$label}\n\n"
                . "ℹ️ {$text}\n"
                . "📍 <b>IP :</b> <code>{$ip}</code>\n"
                . "📱 <b>Navigateur :</b> <code>{$userAgent}</code>\n"
                . "⏰ <b>Date/Heure :</b> <code>{$time}</code>";

            TelegramService::sendMessage($telegramMessage);

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            Log::error("Erreur lors du suivi du CV : " . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur'], 500);
        }
    }
}

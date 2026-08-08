<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\TelegramService;

class NotifyTelegramVisitor
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // N'exécuter que sur les requêtes GET publiques (hors admin & assets)
        if ($request->isMethod('GET') && !$request->is('admin*') && !$request->is('api*') && !$request->ajax()) {
            if (!$request->session()->has('telegram_visitor_notified')) {
                $request->session()->put('telegram_visitor_notified', true);

                $ip = $request->ip();
                $page = $request->fullUrl();
                $userAgent = substr($request->userAgent() ?? 'Inconnu', 0, 150);
                $time = now()->format('d/m/Y à H:i:s');

                $msg = "👁️ <b>[NOUVEAU VISITEUR SUR VOTRE SITE]</b>\n\n"
                    . "🔗 <b>Page consultée :</b> <code>{$page}</code>\n"
                    . "📍 <b>Adresse IP :</b> <code>{$ip}</code>\n"
                    . "📱 <b>Navigateur :</b> <code>{$userAgent}</code>\n"
                    . "⏰ <b>Horodatage :</b> <code>{$time}</code>";

                // Envoi asynchrone non-bloquant
                try {
                    TelegramService::sendMessage($msg);
                } catch (\Throwable $e) {
                    // Ignorer silencieusement pour ne pas bloquer le chargement
                }
            }
        }

        return $response;
    }
}

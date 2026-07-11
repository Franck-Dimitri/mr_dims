<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Stevebauman\Location\Facades\Location;

class TrackPortfolioActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // On ne traque pas le SYS_CTRL (mr_dims) s'il est connecté
        if (auth()->check() && auth()->user()->role === 'mr_dims') {
            return $next($request);
        }

        // Récupérer l'IP du visiteur
        $ip = $request->ip();
        
        // Obtenir le pays via le package Location (si disponible)
        $country = 'Inconnu';
        if ($position = Location::get($ip)) {
            $country = $position->countryName;
        }

        // Hash unique pour identifier le visiteur (IP + User Agent)
        $visitorHash = hash('sha256', $ip . $request->userAgent());

        // Enregistrer la vue dans la base de données
        DB::table('analytics_page_views')->insert([
            'page_url' => $request->fullUrl(),
            'visitor_hash' => $visitorHash,
            'ip_address' => $ip,
            'country' => $country,
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $next($request);
    }
}

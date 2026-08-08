<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsPageView;
use App\Models\SystemLog;
use App\Models\CvAnalytic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        // Seed sample system logs if empty
        if (SystemLog::count() === 0) {
            $this->seedSampleSystemLogs();
        }

        // 1. Query Visitor Activity Logs
        $query = AnalyticsPageView::latest();
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('page_url', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%")
                  ->orWhere('user_agent', 'like', "%{$search}%");
            });
        }
        $visitorLogs = $query->paginate(20)->withQueryString();

        // 2. Query System & Security Logs
        $systemLogs = SystemLog::latest()->take(30)->get();

        // 3. Query CV Analytics Logs
        $cvLogs = CvAnalytic::latest()->take(30)->get();

        // 4. Activity Stats
        $stats = [
            'totalRequests' => AnalyticsPageView::count(),
            'todayRequests' => AnalyticsPageView::whereDate('created_at', now()->today())->count(),
            'todayUniqueIps' => AnalyticsPageView::whereDate('created_at', now()->today())->distinct('ip_address')->count('ip_address'),
            'totalSystemLogs' => SystemLog::count(),
            'systemErrors' => SystemLog::whereIn('level', ['ERROR', 'CRITICAL'])->count(),
        ];

        return Inertia::render('Admin/ActivityLogs/Index', [
            'logs' => $visitorLogs,
            'systemLogs' => $systemLogs,
            'cvLogs' => $cvLogs,
            'stats' => $stats,
            'filters' => $request->only(['search']),
        ]);
    }

    private function seedSampleSystemLogs()
    {
        $samples = [
            [
                'level' => 'INFO',
                'message' => 'Nouveau déploiement automatique réussi via le bot Telegram (branche: main)',
                'context' => ['branch' => 'main', 'executor' => 'Telegram Bot', 'commit' => '7a3f9e1'],
                'created_at' => now()->subMinutes(15),
            ],
            [
                'level' => 'INFO',
                'message' => 'Sauvegarde automatique de 02:00 AM générée et transmise à Telegram',
                'context' => ['size_mb' => 2.4, 'file' => 'portfolio_sqlite_20260808.sqlite.gz'],
                'created_at' => now()->subHours(4),
            ],
            [
                'level' => 'WARNING',
                'message' => 'Tentative d\'accès non autorisée détectée par le bot Telegram',
                'context' => ['user_id' => 98765432, 'action' => '/deploy_test'],
                'created_at' => now()->subHours(12),
            ],
            [
                'level' => 'INFO',
                'message' => 'Compilation des assets Vite effectuée avec succès (bundle ogl intégré)',
                'context' => ['duration_s' => 12.5, 'environment' => 'production'],
                'created_at' => now()->subDay(),
            ],
            [
                'level' => 'INFO',
                'message' => 'Session administrateur démarrée avec succès (IP: 102.244.11.5)',
                'context' => ['user' => 'mr_dims', 'ip' => '102.244.11.5'],
                'created_at' => now()->subDays(2),
            ],
        ];

        foreach ($samples as $log) {
            SystemLog::create($log);
        }
    }
}

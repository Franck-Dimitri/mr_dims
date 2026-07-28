<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsPageView;
use App\Models\ProjectVisit;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index()
    {
        // 1. Totaux
        $totalViews = AnalyticsPageView::count();
        $uniqueVisitors = AnalyticsPageView::distinct('visitor_hash')->count('visitor_hash');
        $todayViews = AnalyticsPageView::whereDate('created_at', Carbon::today())->count();
        $todayVisitors = AnalyticsPageView::whereDate('created_at', Carbon::today())->distinct('visitor_hash')->count('visitor_hash');

        // 2. Chart 14 jours
        $days = collect();
        for ($i = 13; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $label = Carbon::now()->subDays($i)->format('d M');
            $days->put($date, [
                'label' => $label,
                'views' => 0,
                'visitors' => 0,
            ]);
        }

        $viewsPerDay = AnalyticsPageView::where('created_at', '>=', Carbon::now()->subDays(14)->startOfDay())
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as views'), DB::raw('count(distinct visitor_hash) as visitors'))
            ->groupBy('date')
            ->get();

        foreach ($viewsPerDay as $row) {
            if ($days->has($row->date)) {
                $days->put($row->date, [
                    'label' => Carbon::parse($row->date)->format('d M'),
                    'views' => (int) $row->views,
                    'visitors' => (int) $row->visitors,
                ]);
            }
        }

        // 3. Top pages
        $topPages = AnalyticsPageView::select('page_url', DB::raw('count(*) as total_views'), DB::raw('count(distinct visitor_hash) as unique_visitors'))
            ->groupBy('page_url')
            ->orderByDesc('total_views')
            ->take(10)
            ->get();

        // 4. Top pays
        $topCountries = AnalyticsPageView::select('country', DB::raw('count(*) as total'))
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->groupBy('country')
            ->orderByDesc('total')
            ->take(10)
            ->get();

        // 5. Visites projets
        $projectVisitStats = Project::all()
            ->map(function ($project) {
                $visitCount = ProjectVisit::where('project_id', $project->id)->count();
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'likes_count' => $project->likes_count ?? 0,
                    'visits_count' => $visitCount,
                ];
            });

        return Inertia::render('Admin/Analytics/Index', [
            'stats' => [
                'totalViews' => $totalViews,
                'uniqueVisitors' => $uniqueVisitors,
                'todayViews' => $todayViews,
                'todayVisitors' => $todayVisitors,
            ],
            'chartData' => [
                'labels' => $days->pluck('label')->values()->all(),
                'views' => $days->pluck('views')->values()->all(),
                'visitors' => $days->pluck('visitors')->values()->all(),
            ],
            'topPages' => $topPages,
            'topCountries' => $topCountries,
            'projectVisitStats' => $projectVisitStats,
        ]);
    }
}

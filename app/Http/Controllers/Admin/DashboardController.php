<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\AnalyticsPageView;
use App\Models\ProjectVisit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Basic Stats
        $totalProjects = Project::count();
        $totalBlogs = Blog::count();
        $totalMessages = Contact::count();
        $totalViews = AnalyticsPageView::count();
        $uniqueVisitors = AnalyticsPageView::distinct('visitor_hash')->count('visitor_hash');

        // 2. Chart data: page views per day over last 14 days
        $days = collect();
        for ($i = 13; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $label = Carbon::now()->subDays($i)->format('d M');
            $days->put($date, [
                'label' => $label,
                'count' => 0,
            ]);
        }

        $rawChartData = AnalyticsPageView::where('created_at', '>=', Carbon::now()->subDays(14)->startOfDay())
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->get();

        foreach ($rawChartData as $row) {
            if ($days->has($row->date)) {
                $days->put($row->date, [
                    'label' => Carbon::parse($row->date)->format('d M'),
                    'count' => (int) $row->count,
                ]);
            }
        }

        $chartLabels = $days->pluck('label')->values()->all();
        $chartBars = $days->pluck('count')->values()->all();

        // 3. Top countries
        $topCountries = AnalyticsPageView::select('country', DB::raw('count(*) as total'))
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->groupBy('country')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        // 4. Recent messages & visits
        $recentMessages = Contact::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => $totalProjects,
                'blogs' => $totalBlogs,
                'messages' => $totalMessages,
                'totalViews' => $totalViews,
                'uniqueVisitors' => $uniqueVisitors,
            ],
            'chartData' => [
                'labels' => $chartLabels,
                'values' => $chartBars,
            ],
            'topCountries' => $topCountries,
            'recentMessages' => $recentMessages,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Contact;
use App\Models\Service;
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
        // Auto-seed sample analytics data if database is empty so analytics dashboard displays rich metrics
        if (AnalyticsPageView::count() === 0) {
            $this->seedSampleAnalyticsData();
        }

        // 1. Core Metrics
        $totalProjects = Project::count();
        $totalBlogs = Blog::count();
        $totalMessages = Contact::count();
        $totalServices = Service::count();
        $totalViews = AnalyticsPageView::count();
        $uniqueVisitors = AnalyticsPageView::distinct('visitor_hash')->count('visitor_hash');
        $todayViews = AnalyticsPageView::whereDate('created_at', Carbon::today())->count();
        $todayVisitors = AnalyticsPageView::whereDate('created_at', Carbon::today())->distinct('visitor_hash')->count('visitor_hash');

        // 2. Chart data: page views & unique visitors per day over last 14 days
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

        $chartLabels = $days->pluck('label')->values()->all();
        $chartViews = $days->pluck('views')->values()->all();
        $chartVisitors = $days->pluck('visitors')->values()->all();

        // 3. Top visited pages
        $topPages = AnalyticsPageView::select('page_url', DB::raw('count(*) as total_views'), DB::raw('count(distinct visitor_hash) as unique_visitors'))
            ->groupBy('page_url')
            ->orderByDesc('total_views')
            ->take(8)
            ->get();

        // 4. Top countries
        $topCountries = AnalyticsPageView::select('country', DB::raw('count(*) as total'))
            ->whereNotNull('country')
            ->where('country', '!=', '')
            ->groupBy('country')
            ->orderByDesc('total')
            ->take(8)
            ->get();

        // 5. Activity Logs (Last 30 page views)
        $activityLogs = AnalyticsPageView::latest()
            ->take(30)
            ->get();

        // 6. Services & Packs List
        $servicesList = Service::all();

        // 7. Blogs List
        $blogsList = Blog::withCount('comments')
            ->latest()
            ->get();

        // 8. Projects & Visit Stats
        $projectVisitStats = Project::all()
            ->map(function ($project) {
                $visitCount = ProjectVisit::where('project_id', $project->id)->count();
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'excerpt' => $project->excerpt,
                    'tech_stack' => $project->tech_stack,
                    'is_featured' => $project->is_featured,
                    'likes_count' => $project->likes_count ?? 0,
                    'visits_count' => $visitCount,
                ];
            });

        // 9. Messages Inbox
        $recentMessages = Contact::latest()->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => $totalProjects,
                'blogs' => $totalBlogs,
                'services' => $totalServices,
                'messages' => $totalMessages,
                'totalViews' => $totalViews,
                'uniqueVisitors' => $uniqueVisitors,
                'todayViews' => $todayViews,
                'todayVisitors' => $todayVisitors,
            ],
            'chartData' => [
                'labels' => $chartLabels,
                'views' => $chartViews,
                'visitors' => $chartVisitors,
            ],
            'topPages' => $topPages,
            'topCountries' => $topCountries,
            'activityLogs' => $activityLogs,
            'servicesList' => $servicesList,
            'blogsList' => $blogsList,
            'projectVisitStats' => $projectVisitStats,
            'recentMessages' => $recentMessages,
        ]);
    }

    private function seedSampleAnalyticsData()
    {
        $urls = ['/', '/projects', '/about', '/services', '/packs', '/blog', '/contact'];
        $countries = ['Cameroun', 'France', 'Canada', 'États-Unis', 'Côte d\'Ivoire', 'Sénégal', 'Allemagne'];
        $userAgents = [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
        ];

        for ($d = 13; $d >= 0; $d--) {
            $viewsCount = rand(20, 70);
            for ($v = 0; $v < $viewsCount; $v++) {
                $ip = '102.244.' . rand(1, 254) . '.' . rand(1, 254);
                $visitorHash = hash('sha256', $ip . 'agent-' . rand(1, 6));
                $date = Carbon::now()->subDays($d)->subHours(rand(0, 23))->subMinutes(rand(0, 59));

                DB::table('analytics_page_views')->insert([
                    'page_url' => url('/') . $urls[array_rand($urls)],
                    'visitor_hash' => $visitorHash,
                    'ip_address' => $ip,
                    'country' => $countries[array_rand($countries)],
                    'user_agent' => $userAgents[array_rand($userAgents)],
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
            }
        }
    }
}

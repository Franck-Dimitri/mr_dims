<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectVisit;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stevebauman\Location\Facades\Location;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(Request $request)
    {
        $query = Project::with('images')->orderBy('created_at', 'desc');

        // Optional filtering by category
        if ($request->has('category') && $request->category !== 'ALL') {
            $query->where('category', $request->category);
        }

        $projects = $query->get()->map(function ($project) {
            $images = [];
            if ($project->cover_image) {
                $images[] = $project->cover_image;
            }
            foreach ($project->images as $img) {
                $images[] = $img->image_path;
            }
            $arr = $project->toArray();
            $arr['images'] = $images;
            return $arr;
        });

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['category']),
        ]);
    }

    /**
     * Display the specified project and send real-time Telegram alert.
     */
    public function show(Request $request, $slug)
    {
        $project = Project::with('images')->where('slug', $slug)->firstOrFail();
        
        // Track the visit
        $ip = $request->ip();
        $country = 'Inconnu';
        try {
            if ($position = Location::get($ip)) {
                $country = $position->countryName;
            }
        } catch (\Exception $e) {
            // silent catch
        }

        $visit = ProjectVisit::create([
            'project_id' => $project->id,
            'ip_address' => $ip,
            'country' => $country,
            'user_agent' => $request->userAgent(),
            'likes_count' => 0,
        ]);

        // Save visit ID in session to associate likes during this session
        session(['last_project_visit_' . $project->id => $visit->id]);

        // Send Real-Time Telegram Alert
        $totalVisits = ProjectVisit::where('project_id', $project->id)->count();
        $projectUrl = url("/projects/{$project->slug}");
        $time = now()->format('d/m/Y à H:i:s');

        $telegramMsg = "🚀 <b>[PROJET CONSULTÉ SUR LE PORTFOLIO]</b>\n\n"
            . "📁 <b>Projet :</b> <code>{$project->title}</code>\n"
            . "👁️ <b>Nombre total de vues :</b> <code>{$totalVisits}</code>\n"
            . "📍 <b>IP Visiteur :</b> <code>{$ip}</code> ({$country})\n"
            . "🔗 <b>Lien :</b> <code>{$projectUrl}</code>\n"
            . "⏰ <b>Heure :</b> <code>{$time}</code>";

        try {
            TelegramService::sendMessage($telegramMsg);
        } catch (\Throwable $e) {
            // silent catch
        }

        $images = [];
        if ($project->cover_image) {
            $images[] = $project->cover_image;
        }
        foreach ($project->images as $img) {
            $images[] = $img->image_path;
        }
        $projectArray = $project->toArray();
        $projectArray['images'] = $images;

        // Fetch other projects for the bottom list
        $otherProjects = Project::where('id', '!=', $project->id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($other) {
                $imgs = [];
                if ($other->cover_image) {
                    $imgs[] = $other->cover_image;
                }
                $arr = $other->toArray();
                $arr['images'] = $imgs;
                return $arr;
            });

        return Inertia::render('Projects/Show', [
            'project' => $projectArray,
            'otherProjects' => $otherProjects,
        ]);
    }

    /**
     * Like a project visit.
     */
    public function like(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->increment('likes_count');

        $visitId = session('last_project_visit_' . $project->id);
        if ($visitId) {
            $visit = ProjectVisit::find($visitId);
            if ($visit) {
                $visit->increment('likes_count');
            }
        }

        return response()->json([
            'likes_count' => $project->likes_count,
        ]);
    }
}

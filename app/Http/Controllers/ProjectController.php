<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectVisit;
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
     * Display the specified project.
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

        $images = [];
        if ($project->cover_image) {
            $images[] = $project->cover_image;
        }
        foreach ($project->images as $img) {
            $images[] = $img->image_path;
        }
        $projectArray = $project->toArray();
        $projectArray['images'] = $images;

        // Fetch other projects (excluding current one) for the list at the bottom
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
     * Like a project.
     */
    public function like($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        $project->increment('likes_count');

        $visitId = session('last_project_visit_' . $project->id);
        if ($visitId) {
            $visit = ProjectVisit::find($visitId);
            if ($visit) {
                $visit->increment('likes_count');
            }
        }

        return redirect()->back();
    }
}

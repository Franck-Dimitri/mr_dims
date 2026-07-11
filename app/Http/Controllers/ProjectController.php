<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function show($slug)
    {
        $project = Project::with('images')->where('slug', $slug)->firstOrFail();
        $images = [];
        if ($project->cover_image) {
            $images[] = $project->cover_image;
        }
        foreach ($project->images as $img) {
            $images[] = $img->image_path;
        }
        $projectArray = $project->toArray();
        $projectArray['images'] = $images;

        // Increment views or do other logic if needed (analytics in phase 2)

        return Inertia::render('Projects/Show', [
            'project' => $projectArray,
        ]);
    }
}

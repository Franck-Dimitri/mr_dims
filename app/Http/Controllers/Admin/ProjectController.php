<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('images')->latest()->get()->map(function ($project) {
            // Calculate total views from project_visits table
            $views = DB::table('project_visits')
                       ->where('project_id', $project->id)
                       ->count();
                       
            // Build images array for the frontend (cover + others)
            $images = [];
            if ($project->cover_image) {
                $images[] = $project->cover_image;
            }
            foreach ($project->images as $img) {
                $images[] = $img->image_path;
            }

            return array_merge($project->toArray(), [
                'views' => $views,
                'created_at_formatted' => $project->created_at->format('d M Y'),
                'images' => $images,
            ]);
        });

        $stats = [
            'total' => Project::count(),
            'featured' => Project::where('is_featured', true)->count(),
            'views' => DB::table('project_visits')->count(),
            'recent' => Project::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        // Fetch recent visits with project titles for tracking dashboard
        $recentVisits = DB::table('project_visits')
            ->join('projects', 'project_visits.project_id', '=', 'projects.id')
            ->select('project_visits.*', 'projects.title as project_title')
            ->latest('project_visits.created_at')
            ->take(50)
            ->get()
            ->map(function ($visit) {
                $visit->created_at_formatted = \Carbon\Carbon::parse($visit->created_at)->format('d M Y H:i');
                return $visit;
            });

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'stats' => $stats,
            'recentVisits' => $recentVisits,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (is_string($request->tech_stack)) {
            $request->merge([
                'tech_stack' => array_values(array_filter(array_map('trim', explode(',', $request->tech_stack))))
            ]);
        }

        if (is_string($request->key_features)) {
            $request->merge([
                'key_features' => array_values(array_filter(array_map('trim', explode(',', $request->key_features))))
            ]);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'description_markdown' => 'required|string',
            'tech_stack' => 'nullable|array',
            'repository_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'development_time' => 'nullable|string',
            'status' => 'required|string|in:in_progress,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'planned_deployment_date' => 'nullable|date',
            'key_features' => 'nullable|array',
            'images' => 'required|array|min:1|max:4', // 1 to 4 images minimum as requested
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $coverImagePath = null;
        $additionalImagePaths = [];

        if ($request->hasFile('images')) {
            $images = $request->file('images');
            
            // The first image is the cover
            $coverImage = array_shift($images);
            $path = $coverImage->store('projects', 'public');
            $coverImagePath = '/storage/' . $path;

            // The rest are additional images
            foreach ($images as $image) {
                $path = $image->store('projects', 'public');
                $additionalImagePaths[] = '/storage/' . $path;
            }
        }

        $project = Project::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(), // Ensure uniqueness
            'excerpt' => $request->excerpt,
            'description_markdown' => $request->description_markdown,
            'tech_stack' => $request->tech_stack,
            'repository_url' => $request->repository_url,
            'live_url' => $request->live_url,
            'is_featured' => $request->boolean('is_featured'),
            'development_time' => $request->development_time,
            'status' => $request->status,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'planned_deployment_date' => $request->planned_deployment_date,
            'key_features' => $request->key_features,
            'cover_image' => $coverImagePath,
        ]);

        foreach ($additionalImagePaths as $path) {
            $project->images()->create([
                'image_path' => $path
            ]);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Projet créé avec succès.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->load('images');
        
        $images = [];
        if ($project->cover_image) {
            $images[] = $project->cover_image;
        }
        foreach ($project->images as $img) {
            $images[] = $img->image_path;
        }
        
        $projectArray = $project->toArray();
        $projectArray['images'] = $images;

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $projectArray
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        if (is_string($request->tech_stack)) {
            $request->merge([
                'tech_stack' => array_values(array_filter(array_map('trim', explode(',', $request->tech_stack))))
            ]);
        }

        if (is_string($request->key_features)) {
            $request->merge([
                'key_features' => array_values(array_filter(array_map('trim', explode(',', $request->key_features))))
            ]);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'description_markdown' => 'required|string',
            'tech_stack' => 'nullable|array',
            'repository_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'development_time' => 'nullable|string',
            'status' => 'required|string|in:in_progress,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'planned_deployment_date' => 'nullable|date',
            'key_features' => 'nullable|array',
            'new_images' => 'nullable|array|max:4', 
            'new_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $updateData = [
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'description_markdown' => $request->description_markdown,
            'tech_stack' => $request->tech_stack,
            'repository_url' => $request->repository_url,
            'live_url' => $request->live_url,
            'is_featured' => $request->boolean('is_featured'),
            'development_time' => $request->development_time,
            'status' => $request->status,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'planned_deployment_date' => $request->planned_deployment_date,
            'key_features' => $request->key_features,
        ];

        // Replace images if new ones are uploaded
        if ($request->hasFile('new_images')) {
            // Delete old cover image
            if ($project->cover_image) {
                $storagePath = str_replace('/storage/', '', $project->cover_image);
                Storage::disk('public')->delete($storagePath);
            }
            
            // Delete old additional images
            $project->load('images');
            foreach ($project->images as $img) {
                $storagePath = str_replace('/storage/', '', $img->image_path);
                Storage::disk('public')->delete($storagePath);
            }
            $project->images()->delete();

            $images = $request->file('new_images');
            
            // The first image is the cover
            $coverImage = array_shift($images);
            $path = $coverImage->store('projects', 'public');
            $updateData['cover_image'] = '/storage/' . $path;

            // The rest are additional images
            foreach ($images as $image) {
                $path = $image->store('projects', 'public');
                $project->images()->create([
                    'image_path' => '/storage/' . $path
                ]);
            }
        }

        $project->update($updateData);

        return redirect()->route('admin.projects.index')->with('success', 'Projet mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Supprimer la cover image
        if ($project->cover_image) {
            $storagePath = str_replace('/storage/', '', $project->cover_image);
            Storage::disk('public')->delete($storagePath);
        }

        // Supprimer les images additionnelles
        $project->load('images');
        foreach ($project->images as $img) {
            $storagePath = str_replace('/storage/', '', $img->image_path);
            Storage::disk('public')->delete($storagePath);
        }

        $project->delete(); // La suppression en cascade supprimera les enregistrements project_images

        return redirect()->route('admin.projects.index')->with('success', 'Projet supprimé.');
    }
}

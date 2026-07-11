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
            // Calculer les vues totales à partir de la table analytics
            // On compte les occurences de /projects/slug dans la table
            $views = DB::table('analytics_page_views')
                       ->where('page_url', 'like', "%/projects/{$project->slug}%")
                       ->count();
                       
            // Construire le tableau d'images pour le frontend (couverture + autres)
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
            'views' => DB::table('analytics_page_views')->where('page_url', 'like', "%/projects/%")->count(),
            'recent' => Project::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'stats' => $stats
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

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'description_markdown' => 'required|string',
            'tech_stack' => 'nullable|array',
            'repository_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'development_time' => 'nullable|string',
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
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project
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

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'description_markdown' => 'required|string',
            'tech_stack' => 'nullable|array',
            'repository_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'development_time' => 'nullable|string',
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
        ];

        // Replace images if new ones are uploaded
        if ($request->hasFile('new_images')) {
            // Delete old cover image
            if ($project->cover_image) {
                $storagePath = str_replace('/storage/', '', $project->cover_image);
                Storage::disk('public')->delete($storagePath);
            }
            
            // Delete old additional images
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
        foreach ($project->images as $img) {
            $storagePath = str_replace('/storage/', '', $img->image_path);
            Storage::disk('public')->delete($storagePath);
        }

        $project->delete(); // La suppression en cascade supprimera les enregistrements project_images

        return redirect()->route('admin.projects.index')->with('success', 'Projet supprimé.');
    }
}

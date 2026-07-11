<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Project;
use App\Models\Blog;

class HomeController extends Controller
{
    public function index()
    {
        $projects = Project::with('images')->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($project) {
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

        $blogs = Blog::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'projects' => $projects,
            'blogs' => $blogs,
        ]);
    }
}

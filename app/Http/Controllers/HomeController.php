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
        $projects = Project::where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

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

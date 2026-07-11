<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the blogs.
     */
    public function index()
    {
        // For public view, we only show published blogs (if status exists) or all for now
        $blogs = Blog::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('Blog/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Display the specified blog.
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment views
        $blog->increment('views_count');

        // Fetch related/recent blogs (excluding current)
        $recentBlogs = Blog::where('status', 'published')
            ->where('id', '!=', $blog->id)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'recentBlogs' => $recentBlogs
        ]);
    }
}

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
        $blog = Blog::with(['comments' => function ($query) {
                $query->where('is_approved', true)->orderBy('created_at', 'desc');
            }])
            ->where('slug', $slug)
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

    /**
     * Like a blog post.
     */
    public function like($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        $blog->increment('likes_count');
        return redirect()->back();
    }

    /**
     * Store a new comment.
     */
    public function storeComment(Request $request, $slug)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'content' => 'required|string|max:1000',
        ]);

        $blog = Blog::where('slug', $slug)->firstOrFail();

        $blog->comments()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'content' => $validated['content'],
            'is_approved' => true, // Auto-approved as per requirement
        ]);

        return redirect()->back()->with('success', 'Votre commentaire a été publié.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'desc')->get();
        $recentComments = BlogComment::with('blog:id,title')->orderBy('created_at', 'desc')->take(10)->get();
        
        $stats = [
            'total' => Blog::count(),
            'views' => Blog::sum('views_count'),
            'likes' => Blog::sum('likes_count'),
            'comments' => BlogComment::count(),
            'published' => Blog::where('status', 'published')->count(),
        ];

        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
            'recentComments' => $recentComments,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'markdown_content' => 'required|string',
            'meta_description' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        $validated['author'] = 'Mr Dims';

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Blog::create($validated);

        return redirect()->back()->with('success', 'Blog créé avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'markdown_content' => 'required|string',
            'meta_description' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'new_image' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        // Handle published_at if status changed to published
        if ($validated['status'] === 'published' && $blog->status !== 'published' && !$blog->published_at) {
            $validated['published_at'] = now();
        } elseif ($validated['status'] === 'draft') {
            $validated['published_at'] = null;
        }

        if ($request->hasFile('new_image')) {
            // Delete old image if exists
            if ($blog->image && str_starts_with($blog->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $blog->image));
            }
            $path = $request->file('new_image')->store('blogs', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        
        unset($validated['new_image']); // Don't try to save this to DB

        $blog->update($validated);

        return redirect()->back()->with('success', 'Blog mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->image && str_starts_with($blog->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $blog->image));
        }
        $blog->delete();
        return redirect()->back()->with('success', 'Blog supprimé avec succès.');
    }

    /**
     * Remove a comment.
     */
    public function destroyComment(BlogComment $comment)
    {
        $comment->delete();
        return redirect()->back()->with('success', 'Commentaire supprimé.');
    }
}

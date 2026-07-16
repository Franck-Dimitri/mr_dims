<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogController;

// Sitemap Route
Route::get('/sitemap.xml', function () {
    $projects = \App\Models\Project::all();
    $services = \App\Models\Service::all();
    
    return response()->view('sitemap', [
        'projects' => $projects,
        'services' => $services
    ])->header('Content-Type', 'text/xml');
});

Route::middleware('track.activity')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/about', function () { return Inertia::render('About'); })->name('about');
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
    Route::get('/packs', function () { return Inertia::render('Packs'); })->name('packs');
    Route::get('/contact', function () { return Inertia::render('Contact'); })->name('contact');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
    Route::post('/projects/{slug}/like', [ProjectController::class, 'like'])->name('projects.like');
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
    Route::post('/blog/{slug}/like', [BlogController::class, 'like'])->name('blog.like');
    Route::post('/blog/{slug}/comment', [BlogController::class, 'storeComment'])->name('blog.comment.store');
});
use App\Models\Project;
use App\Models\Blog;
use App\Models\Contact;

Route::prefix('admin')->middleware(['auth', 'verified', 'mr_dims'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'blogs' => Blog::count(),
                'messages' => Contact::count(),
            ],
            'recentMessages' => Contact::latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Admin Project Routes
    Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class)->names([
        'index' => 'admin.projects.index',
        'create' => 'admin.projects.create',
        'store' => 'admin.projects.store',
        'edit' => 'admin.projects.edit',
        'update' => 'admin.projects.update',
        'destroy' => 'admin.projects.destroy',
    ])->except(['show']);

    // Admin Blog Routes
    Route::resource('blogs', \App\Http\Controllers\Admin\BlogController::class)->names([
        'index' => 'admin.blogs.index',
        'store' => 'admin.blogs.store',
        'update' => 'admin.blogs.update',
        'destroy' => 'admin.blogs.destroy',
    ])->except(['create', 'show', 'edit']);
    Route::delete('/blogs/comments/{comment}', [\App\Http\Controllers\Admin\BlogController::class, 'destroyComment'])->name('admin.blogs.comments.destroy');
});

require __DIR__.'/auth.php';

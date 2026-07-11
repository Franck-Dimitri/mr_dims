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
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
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
});

require __DIR__.'/auth.php';

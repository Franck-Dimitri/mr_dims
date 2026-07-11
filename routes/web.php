<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', function () { return Inertia::render('About'); })->name('about');
use App\Http\Controllers\ServiceController;
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/packs', function () { return Inertia::render('Packs'); })->name('packs');
Route::get('/contact', function () { return Inertia::render('Contact'); })->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogController;
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
use App\Models\Project;
use App\Models\Blog;
use App\Models\Contact;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'projects' => Project::count(),
            'blogs' => Blog::count(),
            'messages' => Contact::count(),
        ],
        'recentMessages' => Contact::latest()->take(5)->get(),
    ]);
})->middleware(['auth', 'verified', 'mr_dims'])->name('dashboard');

Route::middleware(['auth', 'mr_dims'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\AnalyticsController as AdminAnalyticsController;
use App\Http\Controllers\Admin\ActivityLogController as AdminActivityLogController;
use App\Http\Controllers\Admin\SystemControlController;
use App\Http\Controllers\Admin\PrivateProductController as AdminPrivateProductController;

/*
|--------------------------------------------------------------------------
| Public Portfolio Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');

// Projects Routes
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');

// Services & Packs Routes
Route::get('/packs', [ServiceController::class, 'index'])->name('packs.index');

// Blog Routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{slug}/comments', [BlogController::class, 'storeComment'])->name('blog.comments.store');

// Contact & Estimation Routes
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/estimate', [EstimateController::class, 'store'])->name('estimate.store');

// CV Routes
Route::get('/cv/view', [CvController::class, 'view'])->name('cv.view');
Route::get('/cv/download', [CvController::class, 'download'])->name('cv.download');

/*
|--------------------------------------------------------------------------
| Admin Dashboard Routes (MR_DIMS)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware(['auth', 'verified', 'mr_dims'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

    // Admin Services & Packs Routes
    Route::resource('services', AdminServiceController::class)->names([
        'index' => 'admin.services.index',
        'store' => 'admin.services.store',
        'update' => 'admin.services.update',
        'destroy' => 'admin.services.destroy',
    ])->except(['create', 'show', 'edit']);

    // Admin Digital Products & Financial Tracking Module
    Route::resource('private-products', AdminPrivateProductController::class)->names([
        'index' => 'admin.private-products.index',
        'store' => 'admin.private-products.store',
        'update' => 'admin.private-products.update',
        'destroy' => 'admin.private-products.destroy',
    ])->except(['create', 'show', 'edit']);

    // Admin Messages Routes
    Route::get('/messages', [AdminMessageController::class, 'index'])->name('admin.messages.index');
    Route::delete('/messages/{message}', [AdminMessageController::class, 'destroy'])->name('admin.messages.destroy');

    // Admin Analytics Route
    Route::get('/analytics', [AdminAnalyticsController::class, 'index'])->name('admin.analytics.index');

    // Admin Activity Logs Route
    Route::get('/activity-logs', [AdminActivityLogController::class, 'index'])->name('admin.activity.index');

    // System Control & Maintenance Routes
    Route::get('/system/health', [SystemControlController::class, 'getSystemHealth'])->name('admin.system.health');
    Route::post('/system/deploy', [SystemControlController::class, 'deploy'])->name('admin.system.deploy');
    Route::post('/system/backup', [SystemControlController::class, 'createBackup'])->name('admin.system.backup');
    Route::get('/system/backup/download/{filename}', [SystemControlController::class, 'downloadBackup'])->name('admin.system.backup.download');
});

// Private Digital Sales Module (Obfuscated Routes with noindex)
use App\Http\Controllers\PrivateOfferController;
Route::prefix('p')->group(function () {
    Route::get('/vault/{token?}', [PrivateOfferController::class, 'index'])->name('private.index');
    Route::get('/offer/{slug}/{token}', [PrivateOfferController::class, 'show'])->name('private.show');
    Route::get('/checkout/{slug}/{token}', [PrivateOfferController::class, 'checkout'])->name('private.checkout');
    Route::post('/checkout/{slug}/{token}', [PrivateOfferController::class, 'processCheckout'])->name('private.process_checkout');
    Route::get('/success/{order_hash}', [PrivateOfferController::class, 'success'])->name('private.success');
});

require __DIR__.'/auth.php';

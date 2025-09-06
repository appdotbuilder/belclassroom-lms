<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main Dashboard - role-based
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Course Management
    Route::resource('courses', CourseController::class);
    
    // TODO: Add more LMS routes
    // Route::resource('assignments', AssignmentController::class);
    // Route::resource('announcements', AnnouncementController::class);
    // Route::resource('messages', MessageController::class);
    // Route::resource('users', UserController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

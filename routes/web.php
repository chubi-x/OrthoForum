<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// POSTS ROUTES
Route::middleware(['auth','verified'])->group(function () {
    //    create post view
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    //   show all posts
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    //    store post
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    //    update post
    Route::post('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
    //    edit post view
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
    //    show post
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
    //    edit post
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
});

//COMMENTS ROUTES
Route::middleware(['auth','verified'])->group(function () {
//    Route::get('/comments/{id}/edit', [CommentController::class, 'edit'])->name('comments.edit');
//    Route::get('/comments/create', [CommentController::class, 'create'])->name('comments.create');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::patch('/comments/{id}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update-avatar', [ProfileController::class, 'updateAvatar'])->name('profile.update-avatar');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// GET ASSET PATHS
Route::get('/avatars/{filename}', function ($filename)
{
    return response()->file(storage_path('app/public/avatars/' . $filename));
})->name('avatars.path');

Route::get('/images/{filename}', function ($filename)
{
    return response()->file(storage_path('app/public/posts/' . $filename));
})->name('posts.image-path');

require __DIR__.'/auth.php';

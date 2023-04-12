<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
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

// PRIVATE POSTS ROUTES
Route::middleware(['auth','verified'])->group(function () {
    //    create post view
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    //    store post
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    //    update post
    Route::post('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
    //    edit post view
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
    //    edit post
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
});
//PUBLIC POSTS ROUTES
//    show all posts by user
Route::get('/posts/user/{id}', [PostController::class, 'indexByUser'])->name('posts.indexByUser');
//    show post
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

//COMMENTS ROUTES
Route::middleware(['auth','verified'])->group(function () {
//    Route::get('/comments/{id}/edit', [CommentController::class, 'edit'])->name('comments.edit');
//    Route::get('/comments/create', [CommentController::class, 'create'])->name('comments.create');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::patch('/comments/{id}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// PROFILE ROUTES
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update-avatar', [ProfileController::class, 'updateAvatar'])->name('profile.update-avatar');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//MODERATOR ROUTES
Route::post('/moderator/create', [ModeratorController::class, 'store'])->name('moderator.store')
    ->middleware('auth','verified');

Route::middleware(['auth','verified','isModerator'])->group(function () {
    Route::get('/moderator/dashboard/{id}', [ModeratorController::class, 'show'] )-> name('moderator.show');
});

//ROOM ROUTES

Route::middleware(['auth', 'isModerator'])->group(function () {
    Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::get('/rooms/{id}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
    Route::post('/rooms/{id}', [RoomController::class, 'update'])->name('rooms.update');
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy');
});
Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
Route::get('/rooms/{id}', [RoomController::class, 'show'])->name('rooms.show');




// GET ASSET PATHS
Route::get('/avatars/{filename}', function ($filename)
{
    return response()->file(storage_path('app/public/avatars/' . $filename));
})->name('avatars.path');

Route::get('/images/{filename}', function ($filename)
{
    return response()->file(storage_path('app/public/posts/' . $filename));
})->name('posts.image-path');

//route to get room banner
Route::get('/banners/{filename}', function ($filename)
{
    return response()->file(storage_path('app/public/banners/' . $filename));
})->name('rooms.banner-path');


require __DIR__.'/auth.php';

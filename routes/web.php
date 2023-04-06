<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// user sign up (members and moderators)
Route::get('/signup',[UserController::class, 'create'])->name("user.create");
Route::post('/users/create',[UserController::class, 'store'])->name("user.store");

//admin signup
//Route::get('/signup/admin',[AdminController::class, 'create'])->name("admin.create");
//Route::post('/users/admin/create',[AdminController::class, 'store'])->name("admin.store");

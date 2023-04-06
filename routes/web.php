<?php

use App\Http\Controllers\MemberController;
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

// list all members
Route::get('/users',[MemberController::class,'index'])->name("members.index");

//user dashboard
Route::get('/users/{id}',[UserController::class, 'show']);

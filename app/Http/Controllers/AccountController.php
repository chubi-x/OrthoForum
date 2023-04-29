<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Member;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function show(Request $request, string $id): Response
    {
        //get posts by user
        $posts = Post::all()->where('member_id', $id);
        foreach ($posts as $post) {
            $post->likes;
            $post->images;
        }
        $comments = Comment::all()->where('member_id', $id);


        return Inertia::render('Account/Show', [
            'user' => User::find( Member::find($id)->user->id ),
            'posts' => array_values($posts->toArray()),
            'comments' => array_values($comments->toArray()),
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Account/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('account.edit');
    }

    /**
     * Update User's Avatar
     */
    public function updateAvatar(Request $request)
    {
//        dd($request->file('avatar'));
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = $request->user();
        $user->avatar()->delete();
        $image = new Image;
        $avatar = $request->file('avatar');
        $avatar->storeAs('avatars', $user->id . '.' . $avatar->extension(), 'public');
        $image->path = $user->id .'.'. $avatar->extension();
        $image->type = 'AVATAR';
        $image->imageable()->associate($user);
        $user->avatar()->save($image);
        $image->save();
//        dd($user->avatar);
        return Redirect::route('account.edit');
    }
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        Auth::logout();

        //delete user and corresponding member
        Member::find($user->userable_id)->delete();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

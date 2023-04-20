<?php

namespace App\Http\Controllers;

use App\Events\CommentedOnPost;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "text" => "required",
            "member_id" => "required",
            "post_id" => "required"
        ]);
        $user = $request->user();
        $post = Post::find($request->all()["post_id"]);
        $postOwner = User::find( $post->member->user->id );
//        dd($request->all());
        $comment = new Comment();
        $comment->member()->associate($user->userable_id);
        $comment->post()->associate($post);
        $comment->text = $request->all()["text"];
        $comment->save();

        CommentedOnPost::dispatch($user->username, $postOwner, $post );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Gate::denies("delete-comment", Comment::find($id))){
            abort("403","You cannot delete this comment");
        }
        Comment::destroy($id);
    }
}

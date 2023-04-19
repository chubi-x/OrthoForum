<?php

namespace App\Http\Controllers;

use App\Events\ModeratorDeletedPost;
use App\Events\PostLiked;
use App\Models\Image;
use App\Models\Like;
use App\Models\Member;
use App\Models\Post;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function indexByUser(string $id)
    {
        $posts = Post::where("member_id", $id)->get();
//        dd($posts);
        foreach ($posts as $post){
            $post->images;
            $post->room;
            $post->likes;
        }
        return Inertia::render("Posts/Index", ["posts" => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Posts/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title" => "required",
            "body" => "required",
        ]);
        $post = new Post;
        $post->title = $request->all()["title"];
        $post->body = $request->all()["body"];
        $post->member()->associate( Member::find($request->all()["userable_id"]) );
        //check if room id is not null and associate it
        if ($request->all()["room_id"] != null){
            $post->room()->associate( Room::find($request->all()["room_id"]) );
        }
        $post->save();
        $this->uploadPostImages($request, $post);

        //if room is null, redirect to user's posts
        if ($request->all()["room_id"] == null){
            return Redirect::route("posts.indexByUser",[ "id" => $request->user()->userable_id]);
        }
        //else redirect to room's posts
        return Redirect::route("rooms.show", ["id" => $request->all()["room_id"]]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findorFail($id);
        $author = User::find(Member::find($post->member_id)->user->id)->username;
        $comments = $post->comments;
        $images = $post->images;
        $post->room;
        $post->likes;
//       show author name of each comment
        foreach ($comments as $comment){
            $comment->author = User::find(Member::find($comment->member_id)->user->id)->username;
        }
        $canEditPost = Gate::allows('edit-post', $post);
        $canDeletePost = Gate::allows('delete-post', $post);
        return Inertia::render("Posts/Show",
            [
                "post" => $post,
                "author"=> $author,
                "comments" => $comments,
                "images" => $images,
                "canEditPost" => $canEditPost,
                "canDeletePost" => $canDeletePost
            ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::findorFail($id);
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('edit-post', $post)){
            abort(403, 'You cannot edit this post');
        }
        $images = $post->images;
        return Inertia::render("Posts/Edit", ["post" => $post, "images" => $images]);
    }

    /*
     * Like post
     */
    public function like(Request $request, string $id)
    {
        $post = Post::findorFail($id);
        $like = new Like;
        // attach member id to post likes
        $member = Member::find($request->user()->userable_id);
        $like->member()->associate($member);
        $like->post()->associate($post);
        $like->save();
        //broadcast event
        PostLiked::dispatch( User::find( $post->member->user->id ) , $request->user()->username, $post);
        return Redirect::route("posts.show", ["id" => $id]);
    }

    /*
     * Unlike post
     */
    public function unlike(Request $request, string $id)
    {
        $like = Like::where("post_id", $id)->where("member_id", $request->user()->userable_id)->first();
        $like?->delete();
        return Redirect::route("posts.show", ["id" => $id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "body" => "required",
        ]);
        $post = Post::findorFail($id);
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('edit-post', $post)){
            abort(403, 'You cannot edit this post');
        }
        $post->title = $request->all()["title"];
        $post->body = $request->all()["body"];
        $post->save();
       $this->uploadPostImages($request, $post);
        Return Redirect::route("posts.show", ["id" => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , string $id)
    {
        $user = $request->user();
        $member = Member::find($user->userable_id);
        $moderator =  $member->moderator()->exists() ? $member->moderator()->first() : null;
        $post = Post::findorFail($id);
        $postOwner = User::find( $post->member->user->id );
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('delete-post', $post) ) {
            abort(403, 'You cannot delete this post');
        }
        $postInRoom = false;
        $roomId = null;
        //check if post is in a room
        if($post->room_id != null){
            $postInRoom = true;
            $roomId = $post->room_id;
            //check if moderator id and room moderator id are the same
            $room = Room::find($post->room_id);
            if($moderator != null && $room->moderator_id == $moderator->id){
                $moderatorUser = User::find($moderator->member->user->id);
                $post->room()->dissociate();
                ModeratorDeletedPost::dispatch($moderatorUser, $room, $postOwner, $post);
            }
        }
        $post->comments()->delete();
        $post->delete();
        $images = Image::all()->where("imageable_id", $id)->where("type", "POST");
        if($images->count() > 0){
            foreach ($images as $image){
                if(Storage::delete('public/posts/' . $image->path)){
                    $image->delete();
                }
            }
        }

        //if post is in a room redirect to room's posts
        if($postInRoom){

            return Redirect::route("rooms.show", ["id" => $roomId]);
        }

        else return Redirect::route("posts.indexByUser",["id" => $request->user()->userable_id]);

    }

    /**
     * @param Request $request
     * @param Post $post
     * @return void
     */
    private function uploadPostImages(Request $request, Post $post): void {
        if (!empty($request->all()["images"])) {
            //validate images
           $request->validate([
               'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
           ]);
            $imageModels = [];
            foreach ($request->all()["images"] as $index => $image) {
                $imageModel = new Image();
                $image->storeAs('posts', 'post-' . $post->id . '-image-' . $index . '.' . $image->extension(), 'public');
                $imageModel->path = 'post-' . $post->id . '-image-' . $index . '.' . $image->extension();
                $imageModel->imageable()->associate($post);
                $imageModel->type = "POST";
                $imageModel->save();
                $imageModels[] = $imageModel;
            }

            $post->images()->saveMany($imageModels);
            $post->save();
        }
    }
}

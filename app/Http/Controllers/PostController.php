<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Member;
use App\Models\Post;
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
        $posts = Post::all()-> where("member_id", $id);
        foreach ($posts as $post){
            $post->images = $post->images;
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
            "text" => "required",
        ]);
        $post = new Post;
        $post->fill($request->all(["text"]));
        $post->member()->associate($request->all()["userable_id"]);
        $post->save();
        $this->uploadPostImages($request, $post);

        return Redirect::route("posts.indexByUser",[ "id" => $request->all()["userable_id"]]);
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
        $post =  Post::findorFail($id);
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('edit-post', $post)){
            abort(403, 'You cannot edit this post');
        }
        $images = $post->images;
        return Inertia::render("Posts/Edit", ["post" => $post, "images" => $images]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "text" => "required",
        ]);
        $post = Post::findorFail($id);
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('edit-post', $post)){
            abort(403, 'You cannot edit this post');
        }
       $post->fill($request->all(["text"]));
       $this->uploadPostImages($request, $post);
        Return Redirect::route("posts.show", ["id" => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request , string $id)
    {
        $post = Post::findorFail($id);
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('delete-post', $post)){
            abort(403, 'You cannot delete this post');
        }
        $post->delete();
        $images = Image::all()->where("imageable_id", $id)->where("type", "POST");
        if($images->count() > 0){
            foreach ($images as $image){
                if(Storage::delete('public/posts/' . $image->path)){
                    $image->delete();
                }
            }
        }

        return Redirect::route("posts.indexByUser",["id" => $request->all()["userable_id"]]);

    }

    /**
     * @param Request $request
     * @param Post $post
     * @return void
     */
    private function uploadPostImages(Request $request, Post $post): void {
        if (isset($request->all()["images"])) {
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

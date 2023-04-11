<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Member;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = Post::all()-> where("member_id", $request->user()->userable_id);
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
        $post = new Post;
        $post->fill($request->all(["text"]));
        $post->member()->associate($request->all()["userable_id"]);
        $post->save();

        $this->uploadPostImages($request, $post);

        return Redirect::route("posts.indexByUser");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        $author = User::find(Member::find($post->member_id)->user->id)->username;
       $comments = $post->comments;
       $images = $post->images;
//       show author name of each comment
        foreach ($comments as $comment){
            $comment->author = User::find(Member::find($comment->member_id)->user->id)->username;
        }
        return Inertia::render("Posts/Show",
            ["post" => $post,"author"=> $author, "comments" => $comments]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $user = $request->user();
        $member = Member::find($user->userable_id);
        $post =  Post::find($id);
        $images = $post->images;
        if($member->id != $post->member_id){
            return Redirect::route("posts.indexByUser");
        }
        return Inertia::render("Posts/Edit", ["post" => $post, "images" => $images]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $post = Post::find($id);
       $post->fill($request->all(["text"]));
       $this->uploadPostImages($request, $post);
        Return Redirect::route("posts.show", ["id" => $id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Post::findorFail($id)->delete();

        $images = Image::where("imageable_id", $id)->where("type", "POST")->get();
        foreach ($images as $image){
            if(Storage::delete('public/posts/' . $image->path)){
                $image->delete();
            }
        }

        return Redirect::route("posts.indexByUser");

    }

    /**
     * @param Request $request
     * @param Post $post
     * @return void
     */
    private function uploadPostImages(Request $request, Post $post): void {
        if (isset($request->all()["images"])) {
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

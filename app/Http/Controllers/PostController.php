<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = Post::all()-> where("member_id", $request->user()->userable_id);
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
        return Redirect::route("posts.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Post::find($id)->delete();
//        return Redirect::route("posts.index");

    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        dd($request->all());
        $comment = new Comment();
        $comment->member()->associate($request->all()["member_id"]);
        $comment->post()->associate($request->all()["post_id"]);
        $comment->text = $request->all()["text"];
        $comment->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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

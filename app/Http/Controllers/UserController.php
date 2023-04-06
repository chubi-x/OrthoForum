<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
        return view("signup");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate(
            [
                'fullname'=>'required|max:255',
                'email'=> 'required|unique:users',
                'password'=>'required',
                'username'=>'required|unique:users'
            ]
        );
        $user = new User;
        foreach ($validatedData as $key => $value){
            $user->$key = $value;
        }
        //save user as member;
        $member = new Member;
        $member->save();
        $member->user()->save($user);
        $user->save();
        session()->flash("member_signup","Sign Up Successful!");
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
        //
    }
}

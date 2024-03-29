<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Moderator;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //show all rooms
        $rooms = Room::all();
        foreach ($rooms as $room){
            $room->banner = $room->banner_image->path;
            //add moderator username
            $room->moderator->member->user;
        }
        return Inertia::render("Rooms/Index", ["rooms" => $rooms]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Rooms/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|unique:rooms",
            "description" => "required",
            "banner" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);
        $room = new Room;
        $room->name = $request->all()['name'];
        $room->description = $request->all()['description'];
        //associate room moderator with request user moderator id
        $room->moderator()->associate( Moderator::where("member_id", $request->user()->userable_id )->first() );
        $room->save();
        $banner = $request->file('banner');
        $image = new Image;
        $banner->storeAs('banners', $room->id . '.' . $banner->extension(), 'public');
        $image->path  = $room->id .'.'. $banner->extension();
        $image->type = "BANNER";
        $image->imageable()->associate($room);
        $room->banner_image()->save($image);
        $image->save();
        return Redirect::route("rooms.show",["id" => $room->id]);
    }

    /*
     * Join a room
     */
    public function join(Request $request, string $id)
    {
        $room = Room::findorFail($id);
        $room->members()->attach($request->user()->userable_id);
        return Redirect::route("rooms.show",["id" => $room->id]);
    }
    /*
     * Leave a room
     */
    public function leave(Request $request, string $id)
    {
        $room = Room::findorFail($id);
        $room->members()->detach($request->user()->userable_id);
        return Redirect::route("rooms.show",["id" => $room->id]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $room = Room::findorFail($id);
        $room->banner = $room->banner_image->path;
        // check if user is the moderator of the room
        $canModify = Gate::allows('delete-room', $room);
        //add moderator username
//        dd($room->_moderator);
        $moderator = $room->moderator->member->user->username;

        //add posts
        $posts = $room->posts;
        if(!empty($posts)){
            foreach ($posts as $post){
                $post->images;
                $post->member->user;
            }
        }
        $members = $room->members;
        if(!empty($members)){
            foreach ($members as $member){
                $member->user;
            }

        }
        return Inertia::render("Rooms/Show",["room" => $room,
            "canModify" => $canModify,
            "moderator" => $moderator,
            "posts" => $posts,
            "members" => $members
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $room = Room::findorFail($id);
        if(!Gate::allows('edit-room', $room)) {
            abort(403, 'You cannot edit this room as you are not the moderator');
        }
        return Inertia::render("Rooms/Edit",["room" => $room]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //update post details
        $request->validate([
            "name" => "nullable",
            "description" => "nullable",
            "banner" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);
        $room = Room::findorFail($id);
        //update room details only if they are present in request
        // use edit room gate
        if(!Gate::allows('edit-room', $room)) {
            abort(403, 'You cannot edit this room as you are not the moderator');
        }
        if(array_key_exists("name",$request->all()) )
            $request->all()['name'] != null ?  $room->name = $request->all()['name'] : null;
        if(array_key_exists("description",$request->all()))
            $request->all()['description'] ? $room->description = $request->all()['description'] : null;

        $room->save();
        // check if banner is present
        if($request->hasFile('banner')){
            //delete old banner
            Storage::disk('public')->delete('banners/'.$room->banner_image->path);
            $banner = $request->file('banner');
            $banner->storeAs('banners', 'room-'. $room->id . '-banner.' . $banner->extension(), 'public');
            $room->banner_image->path = 'room-'.$room->id . '-banner.'. $banner->extension();
            $room->banner_image->save();
        }
        return Redirect::route("rooms.show",["id" => $room->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $room = Room::findorFail($id);
        $moderatorId = $room->moderator->id;
        //check if user is the author of the post using gate allows method
        if(!Gate::allows('delete-room', $room)) {
            abort(403, 'You cannot delete this room as you are not the moderator');
        }
        $room->delete();
        $images = Image::all()->where("imageable_id", $id)->where("type", "BANNER");
        if($images->count() > 0){
            foreach ($images as $image){
                if(Storage::delete('public/banners/' . $image->path)){
                    $image->delete();
                }
            }
        }
        //return to dashboard if admin
        if($request->user()->userable_type == "App\Models\Admin"){
            return Redirect::route("rooms.index");
        }
        return Redirect::route("moderator.show",["id" => $moderatorId]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Member;
use App\Models\Post;
use App\Models\Room;
use Illuminate\Database\Seeder;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create 20 posts per room
        $rooms = Room::all();
        $members = Member::all()->random(3);

        foreach($rooms as $room){
            foreach($members as $member){
                //associate member and room
                $member->rooms()->attach($room);
                Post::factory(20)->for($member)->for($room)->create();
            }
        }
        //seed likes
        $posts = Post::all();
        foreach($posts as $post){
            Like::factory(50)->for( Member::all()->random() )->for( $post )->create();
        }

    }
}

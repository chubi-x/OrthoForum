<?php

namespace Database\Seeders;

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
        //create 3 posts
        $rooms = Room::all()->random(3);
        $members = Member::all()->random(3);

        foreach($rooms as $room){
            foreach($members as $member){
                Post::factory(20)->for($member)->for($room)->create();
            }
        }

    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Room;
use App\Models\Member;

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
                Post::factory()->for($member)->for($room)->create();
            }
        }

    }
}

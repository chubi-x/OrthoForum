<?php

namespace Database\Seeders;
use App\Models\Image;
use App\Models\Moderator;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // assign moderator to 4 rooms
        $moderators = Moderator::all()->random(4);
        foreach ($moderators as $moderator){
            Image::factory()->for(
                Room::factory()->for($moderator),
                "imageable"
            )->create(
                ["type"=>"BANNER"]
            );
        }
    }
}

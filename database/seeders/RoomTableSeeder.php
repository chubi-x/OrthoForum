<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Moderator;
use App\Models\Member;
use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Sequence;

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
                Room::factory()->for($moderator)
                    ->has(Member::factory()->count(3))->create(),
                "imageable"
            )->create(
                ["type"=>"BANNER"]
            );
        }
    }
}

// ->create([
//                 "type"=>"BANNER",
//                 "imageable_id"=> function(array $at){}  ,
//                 "imageable_type"=>Room::class
//             ])
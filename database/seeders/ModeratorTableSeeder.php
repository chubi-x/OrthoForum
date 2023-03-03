<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Member;
use App\Models\Moderator;

class ModeratorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // assign moderator to 4 members
        $members = Member::all()->random(4);
        foreach ($members as $member){

            Moderator::factory()->for($member)->create();
        }
    }
}
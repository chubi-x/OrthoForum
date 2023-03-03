<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->state(
            new Sequence(
                ["userable_id"=> Member::factory()->createOne()->id, 'userable_type'=> Member::class], //alternate between member and admin for each created user
                ["userable_id"=> Admin::factory()->createOne()->id, 'userable_type'=> Admin::class]
            )
        )
        ->create();
    }
}

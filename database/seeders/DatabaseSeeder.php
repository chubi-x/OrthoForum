<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserTableSeeder::class);
        $this->call(ModeratorTableSeeder::class);
        $this->call(RoomTableSeeder::class);

        // SEEDING ORDER
            // SEED MEMBERS
            // SEED ADMIN
            // SEED USER  ------->> (DONE)
                // create member or admin (randomize it) and save
                // populate fields and save
                //assign user to member or admin

            // SEED MODERATOR ---> (DONE)
                // associate moderator to random member

            //SEED ROOMS ---> (DONE)
                // assign each room to random moderator
                // add random members to room


            // SEED POSTS
                //assign post to random member
                // assign post to random room

            // SEED IMAGES
                // assign each image to random user (avatar), post or room

            //SEED COMMENT
                //assign comment to random post and random user


        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

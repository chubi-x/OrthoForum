<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Member;
use App\Models\Post;
use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // add 3 comments to all posts
        $posts = Post::all();
        $members = Member::all()->random(3);

        foreach($posts as $post){
            // add one comment for 3 members each
            foreach($members as $member){
                Comment::factory()->for($member)->for($post)->create();
            }
        }

    }
}

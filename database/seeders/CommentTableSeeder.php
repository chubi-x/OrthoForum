<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Member;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // add 3 comments to 3 posts
        $posts = Post::all()->random(3);
        $members = Member::all()->random(3);

        foreach($posts as $post){
            // add one comment for 3 members each
            foreach($members as $member){
                Comment::factory()->for($member)->for($post)->create();
            }
        }

    }
}

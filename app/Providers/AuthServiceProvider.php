<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Comment;
use App\Models\Member;
use App\Models\Moderator;
use App\Models\Post;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //create admin gate
        Gate::define('admin', function (User $user) {
            return $user->userable_type == "App\Models\Admin";
        });
        // create edit post gate
        Gate::define('edit-post', function (User $user,Post $post) {
            return $user->userable_id == $post->member_id || //user owns the post
                $user->userable_type == "App\Models\Admin" || //user is admin
                // user is moderator and post was made in one of their rooms
                (  Moderator::find(   Member::find( $user->userable_id )?->moderator?->id    )?->rooms()?->find($post?->room?->id)?->exists());
        });
        // create delete post gate
        Gate::define('delete-post', function (User $user,Post $post) {
            return ($user->userable_id == $post->member_id) || //user owns the post
                $user->userable_type == "App\Models\Admin" || //user is admin
                  // user is moderator and post was made in one of their rooms
                (  Moderator::find(   Member::find( $user->userable_id )?->moderator?->id    )?->rooms()?->find($post?->room?->id)?->exists())  ;
        });
        //create delete comment gate
        Gate::define("delete-comment", function(User $user, Comment $comment){
            return $user->userable_id == $comment->member_id || //user owns the comment
                $user->userable_type == "App\Models\Admin" || //user is admin
                // user is moderator and comment was made in one of their rooms
                (  Moderator::find(   Member::find( $user->userable_id )?->moderator?->id    )?->rooms()?->find($comment?->post?->room?->id)?->exists())  ;
        });

        //create edit room gate
        Gate::define("edit-room", function(User $user, Room $room){
            return   $user->userable_type == "App\Models\Admin" || Moderator::find(   Member::find( $user->userable_id )?->moderator?->id    )?->id  == $room->moderator_id;
        });

        //create delete room gate
        Gate::define("delete-room", function(User $user, Room $room){
            return   $user->userable_type == "App\Models\Admin" || //user is admin
                Moderator::find(   Member::find( $user->userable_id )?->moderator?->id    )?->id  == $room->moderator_id;
        });

        //create delete user gate
        Gate::define("delete-user", function(User $user, User $userToDelete){
            return   $user->userable_type == "App\Models\Admin" || //user is admin
                $user->id == $userToDelete->id;
        });

    }
}

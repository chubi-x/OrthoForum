<?php

namespace App\Events;

use App\Models\Post;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostLiked implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public String $likerUsername;
    private User $user;
    public String $message;
    public Post $post;
    /**
     * Create a new event instance.
     */

    public function __construct($user , $likerUsername, $post)
    {
        $this->user = $user;
        $this->likerUsername = $likerUsername;
        $this->message  = "{$likerUsername} liked your post";
        $this->post = $post;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): Channel
    {
          return  new PrivateChannel('post-liked-channel.'.$this->user->id);
//        return ['post-liked-channel'];
    }
}

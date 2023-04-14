<?php

namespace App\Events;

use App\Models\Post;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentedOnPost implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;
    public string $commenterUsername;
    public User $postOwner;
    public Post $post;

    /**
     * Create a new event instance.
     */
    public function __construct($commenterUsername, $postOwner, $post )
    {
        $this->commenterUsername = $commenterUsername;
        $this->postOwner = $postOwner;
        $this->post = $post;
        $this->message = "{$commenterUsername} commented on your post";
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('commented-on-post-channel.'.$this->postOwner->id),
        ];
    }
}

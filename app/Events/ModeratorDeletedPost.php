<?php

namespace App\Events;

use App\Models\Post;
use App\Models\Room;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ModeratorDeletedPost implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * Create a new event instance.
     */
    public Room $room;
    public User $postOwner;
    public User $moderator;
    public Post $post;
    public String $message;
    public function __construct( $moderator, $room, $postOwner, $post)
    {
        $this->room = $room;
        $this->postOwner = $postOwner;
        $this->post = $post;
        $this->moderator = $moderator;
        $this->message = "{$moderator->username} deleted your post in {$room->name}";
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel>
     */
    public function broadcastOn(): Channel
    {
        return new PrivateChannel('moderator-deleted-post-channel.'.$this->postOwner->id);
    }
}

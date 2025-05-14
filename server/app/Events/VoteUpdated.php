<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;



class VoteUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $votes;
    private int $battleId;

    public function __construct(int $battleId, array $votes)
    {
        $this->battleId = $battleId;
        $this->votes = $votes;
    }

    // Get the channels the event should broadcast on
    public function broadcastOn(): array
    {
        return [
            new Channel('battle.' . $this->battleId),
        ];
    }

    // The data to broadcast.
    public function broadcastWith(): array
    {
        return [
            'votes' => $this->votes,
        ];
    }

    // The event's broadcast name.
    public function broadcastAs(): string
    {
        return 'vote.updated';
    }
}

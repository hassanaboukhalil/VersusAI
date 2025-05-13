<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


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

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('battle.' . $this->battleId),
        ];
    }
}

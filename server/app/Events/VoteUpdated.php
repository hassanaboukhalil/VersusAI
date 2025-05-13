<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


class VoteUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $votes;
    private int $battleId;
}

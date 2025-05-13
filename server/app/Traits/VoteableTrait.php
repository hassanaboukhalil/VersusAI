<?php

namespace App\Traits;

use App\Models\Vote;

trait VoteableTrait
{
    // Get the total votes for this model
    public function getVotesCount(): int
    {
        return $this->votes()->count();
    }
}

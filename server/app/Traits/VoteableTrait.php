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

    // Get the votes relationship
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    // Add a vote to this model
    public function addVote(int $userId, int $aiModelId): bool
    {
        // Check if user has already voted
        if ($this->hasUserVoted($userId)) {
            return false;
        }

        $this->votes()->create([
            'user_id' => $userId,
            'ai_model_id' => $aiModelId
        ]);

        return true;
    }

    // Check if a user has already voted
    public function hasUserVoted(int $userId): bool
    {
        return $this->votes()->where('user_id', $userId)->exists();
    }

    // Get votes count by AI model
    public function getVotesByModel(int $aiModelId): int
    {
        return $this->votes()->where('ai_model_id', $aiModelId)->count();
    }

    // Remove a user's vote
    public function removeVote(int $userId): bool
    {
        $vote = $this->votes()->where('user_id', $userId)->first();

        if (!$vote) {
            return false;
        }

        return $vote->delete();
    }

    // Get a user's vote
    public function getUserVote(int $userId): ?Vote
    {
        return $this->votes()->where('user_id', $userId)->first();
    }
}

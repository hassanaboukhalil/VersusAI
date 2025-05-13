<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class VoteService
{
    public function vote(Battle $battle, int $aiModelId): array
    {
        $userId = Auth::id();

        if ($battle->hasUserVoted($userId)) {
            return [
                'success' => false,
                'message' => 'User has already voted in this battle'
            ];
        }

        $battle->addVote($userId, $aiModelId);

        // Get updated vote counts for both AI models
        $voteStats = [
            $battle->ai_models[0]['id'] => $battle->getVotesByModel($battle->ai_models[0]['id']),
            $battle->ai_models[1]['id'] => $battle->getVotesByModel($battle->ai_models[1]['id'])
        ];

        return [
            'success' => true,
            'message' => 'Vote recorded successfully',
            'votes' => $voteStats
        ];
    }
}

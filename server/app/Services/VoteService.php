<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\Vote;
use App\Events\VoteUpdated;
use Illuminate\Support\Facades\Auth;

class VoteService
{
    public function vote(Battle $battle, string $aiModel): array
    {
        $userId = Auth::id();

        if ($battle->hasUserVoted($userId)) {
            return [
                'success' => false,
                'message' => 'User has already voted in this battle'
            ];
        }

        $battle->addVote($userId, $aiModel);

        // Get updated vote counts for both AI models
        $voteStats = [
            $battle->ai_models[0]['name'] => $battle->getVotesByModel($battle->ai_models[0]['name']),
            $battle->ai_models[1]['name'] => $battle->getVotesByModel($battle->ai_models[1]['name'])
        ];

        // Broadcast the vote update
        broadcast(new VoteUpdated($battle->id, $voteStats))->toOthers();

        return [
            'success' => true,
            'message' => 'Vote recorded successfully',
            'votes' => $voteStats
        ];
    }
}

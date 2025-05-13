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

        // Find the AI model ID from the battle's ai_models array
        $aiModelData = collect($battle->ai_models)->firstWhere('name', $aiModel);
        if (!$aiModelData) {
            return [
                'success' => false,
                'message' => 'Invalid AI model name'
            ];
        }

        $battle->addVote($userId, $aiModelData['id']);

        // Get updated vote counts for both AI models
        $voteStats = [];
        foreach ($battle->ai_models as $model) {
            $voteStats[$model['name']] = $battle->getVotesByModel($model['id']);
        }

        // Broadcast the vote update
        broadcast(new VoteUpdated($battle->id, $voteStats))->toOthers();

        return [
            'success' => true,
            'message' => 'Vote recorded successfully',
            'votes' => $voteStats
        ];
    }
}

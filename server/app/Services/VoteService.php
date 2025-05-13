<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\Vote;
use App\Events\VoteUpdated;
use App\Models\AiModel;
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


        $voted_ai_model_id = AiModel::where('model_name', $aiModel)->first()->id;


        if (!$voted_ai_model_id) {
            return [
                'success' => false,
                'message' => 'Invalid AI model name'
            ];
        }

        $battle->addVote($userId, $voted_ai_model_id);

        // Get updated vote counts for both AI models
        $voteStats = [];
        $model1 = $battle->ai_model_1;
        $model2 = $battle->ai_model_2;
        $voteStats[$model1->name] = $battle->getVotesByModel($model1->id);
        $voteStats[$model2->name] = $battle->getVotesByModel($model2->id);

        // Broadcast the vote update
        broadcast(new VoteUpdated($battle->id, $voteStats))->toOthers();

        return [
            'success' => true,
            'message' => 'Vote recorded successfully',
            'votes' => $voteStats
        ];
    }
}

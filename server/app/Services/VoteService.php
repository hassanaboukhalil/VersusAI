<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\Vote;
use App\Events\VoteUpdated;
use App\Models\AiModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VoteService
{

    protected NotificationService $notificationService;

    public function __construct()
    {
        $this->notificationService = new NotificationService();
    }

    public function vote(Battle $battle, string $aiModel): array
    {
        $userId = Auth::id();

        if ($battle->hasUserVoted($userId)) {
            return [
                'success' => false,
                'message' => 'User has already voted in this battle',
                'data' => null
            ];
        }

        $aiModelObj = AiModel::where('model_name', $aiModel)->first();

        if (!$aiModelObj) {
            return [
                'success' => false,
                'message' => 'Invalid AI model name',
                'data' => null
            ];
        }

        $voted_ai_model_id = $aiModelObj->id;

        $success = $battle->addVote($userId, $voted_ai_model_id);

        if (!$success) {
            return [
                'success' => false,
                'message' => 'Failed to record vote',
                'data' => null
            ];
        }

        // Get updated vote counts
        $voteStats = [
            $battle->ai_model_1->model_name => $battle->getVotesByModel($battle->ai_model_1_id),
            $battle->ai_model_2->model_name => $battle->getVotesByModel($battle->ai_model_2_id),
        ];

        // Send notification to the battle owner if the voter is not the owner
        if ($battle->user_id !== $userId) {
            $this->notificationService->create(
                userId: $battle->user_id,
                notifierId: $userId,
                type: 'vote',
                message: 'Someone voted on your battle.',
                targetId: $battle->id
            );
        }

        // broadcast(new VoteUpdated($battle->id, $voteStats));

        return [
            'success' => true,
            'message' => 'Vote recorded successfully',
            'data' => [
                'votes' => $voteStats
            ]
        ];
    }

    public function unvote(Battle $battle): array
    {
        $userId = Auth::id();

        if (!$battle->hasUserVoted($userId)) {
            return [
                'success' => false,
                'message' => 'User has not voted in this battle',
                'data' => null
            ];
        }

        $success = $battle->removeVote($userId);

        if (!$success) {
            return [
                'success' => false,
                'message' => 'Failed to remove vote',
                'data' => null
            ];
        }

        // Get updated vote counts for both AI models
        $voteStats = [];
        $model1 = $battle->ai_model_1;
        $model2 = $battle->ai_model_2;
        $voteStats[$model1->model_name] = $battle->getVotesByModel($model1->id);
        $voteStats[$model2->model_name] = $battle->getVotesByModel($model2->id);

        // Log vote stats for debugging
        Log::info('Broadcasting vote update after unvote', [
            'battle_id' => $battle->id,
            'vote_stats' => $voteStats
        ]);

        // Broadcast the vote update
        broadcast(new VoteUpdated($battle->id, $voteStats));

        return [
            'success' => true,
            'message' => 'Vote removed successfully',
            'data' => [
                'votes' => $voteStats
            ]
        ];
    }

    public function getUserVote(Battle $battle, int $userId): array
    {
        $hasVoted = $battle->hasUserVoted($userId);

        $votedModel = null;
        if ($hasVoted) {
            $vote = $battle->getUserVote($userId);
            if ($vote) {
                $aiModel = \App\Models\AiModel::find($vote->ai_model_id);
                $votedModel = $aiModel ? $aiModel->model_name : null;
            }
        }

        return [
            'success' => true,
            'message' => 'Vote status retrieved successfully',
            'data' => [
                'hasVoted' => $hasVoted,
                'votedModel' => $votedModel
            ]
        ];
    }
}

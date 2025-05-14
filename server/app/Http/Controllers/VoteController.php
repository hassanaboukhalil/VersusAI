<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Services\VoteService;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    protected VoteService $voteService;

    public function __construct(VoteService $voteService)
    {
        $this->voteService = $voteService;
    }

    public function vote(Request $request)
    {
        try {
            $request->validate([
                'battle_id' => 'required|exists:battles,id',
                'ai_model' => 'required|string',
            ]);

            $battle = Battle::findOrFail($request->battle_id);
            $result = $this->voteService->vote($battle, $request->ai_model);

            if ($result['success']) {
                return $this->successResponse($result['data'], $result['message']);
            }

            return $this->errorResponse($result['message'], 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function unvote(Request $request)
    {
        try {
            $request->validate([
                'battle_id' => 'required|exists:battles,id',
            ]);

            $battle = Battle::findOrFail($request->battle_id);
            $result = $this->voteService->unvote($battle);

            if ($result['success']) {
                return $this->successResponse($result['data'], $result['message']);
            }

            return $this->errorResponse($result['message'], 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getUserVote(Request $request, $battleId)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            $battle = Battle::findOrFail($battleId);
            $result = $this->voteService->getUserVote($battle, $request->user_id);

            if ($result['success']) {
                return $this->successResponse($result['data'], $result['message']);
            }

            return $this->errorResponse($result['message'], 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

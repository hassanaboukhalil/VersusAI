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
        $request->validate([
            'battle_id' => 'required|exists:battles,id',
            'ai_model' => 'required|string',
        ]);

        $battle = Battle::findOrFail($request->battle_id);
        $result = $this->voteService->vote($battle, $request->ai_model);

        return response()->json($result);
    }
}

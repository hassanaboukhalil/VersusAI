<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Services\BattleRoundService;
use Illuminate\Http\Request;

class BattleRoundController extends Controller
{
    public function create(Request $request)
    {
        $battle_round_service = new BattleRoundService();
        $result = $battle_round_service->handleCreateRound($request);

        if ($result) {
            return $this->successResponse($result, 'New round created successfully.');
        }

        return $this->errorResponse('Failed to create round.', 500);
    }
}

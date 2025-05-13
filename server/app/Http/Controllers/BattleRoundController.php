<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Services\BattleRoundService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BattleRoundController extends Controller
{
    public function create(Request $request)
    {
        try {
            $battle_round_service = new BattleRoundService();
            $result = $battle_round_service->handleCreateRound($request);

            if ($result) {
                return $this->successResponse($result, 'New round created successfully.');
            }

            return $this->errorResponse('Battle has ended or does not exist.', 400);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create round: ' . $e->getMessage(), 500);
        }
    }
}

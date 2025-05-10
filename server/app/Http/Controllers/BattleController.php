<?php

namespace App\Http\Controllers;

use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function getAllBattles()
    {
        $battle_service = new BattleService();

        $battles = $battle_service->getAllBattles();

        return $this->successResponse(
            $battles,
            'Battles retrieved successfully.'
        );
    }

    public function create(Request $request)
    {
        $battle_service = new BattleService();

        $battle = $battle_service->createBattle($request);

        if ($battle) {
            return $this->successResponse(
                $battle,
                'Battle created successfully.'
            );
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }
}

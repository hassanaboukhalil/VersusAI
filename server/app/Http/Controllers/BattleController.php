<?php

namespace App\Http\Controllers;

use App\Services\BattleService;

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

    public function create()
    {
        $battle_service = new BattleService();

        $battle = $battle_service->createBattle();

        return $this->successResponse(
            $battle,
            'Battles retrieved successfully.'
        );
    }
}

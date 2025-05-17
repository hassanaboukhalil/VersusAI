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
                [
                    'id' => $battle['id']
                ],
                'Battle created successfully.'
            );
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }

    public function get(int $id)
    {
        $battle_service = new BattleService();
        $battle = $battle_service->getBattle($id);

        if ($battle) {
            return $this->successResponse($battle);
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }

    public function end($id)
    {
        $battle_service = new BattleService();
        $result = $battle_service->endBattle($id);

        if ($result) {
            return $this->successResponse(['id' => $id, 'is_active' => false], 'Battle has been ended.');
        }

        return $this->errorResponse('Battle is already ended or does not exist.', 400);
    }
}

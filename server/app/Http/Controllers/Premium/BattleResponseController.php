<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleResponseController extends Controller
{
    public function getBattleResponse()
    {
        try {
            $battle_service = new BattleService();

            $battle_response = $battle_service->getBattleResponse();

            if ($battle_response) {
                $this->successResponse($battle_response, 'You got the battle response successfully');
            }

            return $this->errorResponse('Something went wrong', 401);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

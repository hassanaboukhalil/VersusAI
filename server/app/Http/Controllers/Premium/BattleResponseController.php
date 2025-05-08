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

            $data = $battle_service->getBattleResponse();

            if (isset($battle_response)) {
                return $this->successResponse($data, 'You got the battle response successfully');
            }

            return $this->errorResponse('Something went wrong', 500);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

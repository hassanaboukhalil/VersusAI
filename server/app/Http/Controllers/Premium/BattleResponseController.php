<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleResponseController extends Controller
{
    public function getBattleResponse()
    {
        $battle_service = new BattleService();

        $battle_response = $battle_service->getBattleResponse();
    }
}

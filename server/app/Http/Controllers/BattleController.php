<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function getAllBattles()
    {
        $battles = Battle::with([
            'user:id,first_name,last_name,profile_picture_url',
            'category:id,name',
            'aiA:id,model_name,logo_url',
            'aiB:id,model_name,logo_url',
        ])->orderBy('created_at', 'desc')->get();

        return $this->successResponse(
            $battles,
            'Battles retrieved successfully.'
        );
    }
}

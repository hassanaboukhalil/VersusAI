<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\Premium\BattleResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::group(['prefix' => 'v1'], function () {
    Route::group(["middleware" => "auth:api"], function () {
        Route::get('/battles', [BattleController::class, 'getAllBattles']);
        Route::group(['prefix' => "premium"], function () {
            Route::get('/get-battle-response', [BattleResponseController::class, 'getBattleResponse']);
        });
    });


    //Unauthenticated Routes
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
});

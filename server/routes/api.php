<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\BattleRoundController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Premium\BattleResponseController;
use App\Http\Controllers\VoteController;
use App\Models\Battle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::group(['prefix' => 'v1'], function () {
    Route::group(["middleware" => "auth:api"], function () {
        Route::get('/battles', [BattleController::class, 'getAllBattles']);
        Route::get('/get-battle/{id}', [BattleController::class, 'get']);
        Route::post('/battles/vote', [VoteController::class, 'vote']);
        Route::post('/battles/unvote', [VoteController::class, 'unvote']);
        Route::get('/battles/{battleId}/user-vote', [VoteController::class, 'getUserVote']);
        Route::post('/pay', [PaymentController::class, 'pay']);
        Route::get('/notifications', [NotificationController::class, 'getNotifications']);

        // Premium Routes
        Route::group(['prefix' => "premium"], function () {
            Route::post('/create-battle', [BattleController::class, 'create']);
            Route::post('/create-round', [BattleRoundController::class, 'create']);
            Route::post('/create-debate-response', [BattleResponseController::class, 'createDebateResponse']);
            Route::post('/get-text-summarization', [BattleResponseController::class, 'getTextSummarization']);
            Route::patch('/battles/{id}/end', [BattleController::class, 'end']);
        });
    });


    //Unauthenticated Routes
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/payment-success', [PaymentController::class, 'paymentSuccess']);
});

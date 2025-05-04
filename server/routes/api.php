<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::group(['prefix' => 'v1'], function () {
    Route::group(["middleware" => "auth:api"], function () {
        // Route::group(['prefix' => 'user'], function () {
        //     Route::get('/getBattles, [BattlesController::class, 'getBattles']);
        // });
    });


    //Unauthenticated Routes
    Route::post('/signup', [AuthController::class, 'signup']);
});

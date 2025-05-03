<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    function signup(SignupRequest $request)
    {
        try {
            $authService = new AuthService();
            $user = $authService->signup($request);
            if ($user) {
                return $this->successResponse($user, 201);
            }
            return $this->errorResponse("Invalid request", 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
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
                return $this->successResponse($user);
            }
            return $this->errorResponse("Invalid request", 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $authService = new AuthService();
            $data = $authService->login($request);

            if ($data) {
                return $this->successResponse($data, 'Login successful');
            }
            return $this->errorResponse('Invalid credentials', 401);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}

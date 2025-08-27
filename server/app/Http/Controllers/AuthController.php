<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function signup(SignupRequest $request): JsonResponse
    {
        try {
            $data = $this->authService->signup($request);
            if ($data) {
                return $this->successResponse($data, 'Signup successful');
            }
            return $this->errorResponse("Invalid request", 400);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $this->authService->login($request);

            if ($data) {
                return $this->successResponse($data, 'Login successful');
            }
            return $this->errorResponse('Invalid credentials', 401);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return $this->successResponse(['message' => 'Successfully logged out']);
    }


    /**
     * Refresh the token.
     */
    public function refresh(): JsonResponse
    {
        $token = $this->authService->refresh();

        return $this->successResponse([
            'token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}

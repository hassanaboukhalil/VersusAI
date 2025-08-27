<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cookie;

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
                $cookie = $this->addTokenToCookie($data['token']);

                return $this->successResponse($data, 'Signup successful')
                    ->withCookie($cookie);
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
                // Set HTTP-only cookie with the token
                $cookie = $this->addTokenToCookie($data['token']);

                return $this->successResponse($data, 'Login successful')
                    ->withCookie($cookie);
            }
            return $this->errorResponse('Invalid credentials', 401);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return $this->successResponse(['message' => 'Successfully logged out'])
            ->withCookie(Cookie::forget('token'));
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

    public function addTokenToCookie($token)
    {
        $cookie = cookie('token', $token, 60 * 24 * 7, '/', null, true, true);

        return $cookie;
    }
}

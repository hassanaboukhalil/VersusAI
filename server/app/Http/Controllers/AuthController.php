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

                // --> comment it if you want to use Postman for testing to be able to take it and put it in the Authorization header in Postman
                unset($data['token']);

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

                // --> comment it if you want to use Postman for testing to be able to take it and put it in the Authorization header in Postman
                unset($data['token']);

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
    // public function refresh(): JsonResponse
    // {
    //     $data = $this->authService->refresh();

    //     if ($data) {
    //         $cookie = $this->addTokenToCookie($data['token']);

    //         // --> comment it if you want to use Postman for testing to be able to take it and put it in the Authorization header in Postman
    //         unset($data['token']);

    //         return $this->successResponse($data, 'Token refreshed successfully')
    //             ->withCookie($cookie);
    //     }



    //     // $token = $this->authService->refresh();

    //     // if ($token) {

    //     //     $cookie = $this->addTokenToCookie($token);
    //     //     return $this->successResponse([
    //     //         'token' => $token,
    //     //         'token_type' => 'bearer',
    //     //     ])->withCookie($cookie);
    //     // }

    //     return $this->errorResponse('Failed to refresh token', 401);
    // }

    public function refresh(): JsonResponse
    {
        $token = $this->authService->refresh();

        if ($token) {

            $cookie = $this->addTokenToCookie($token);
            return $this->successResponse([
                // 'token' => $token,
                // 'token_type' => 'bearer',
                'message' => 'Token refreshed successfully'
            ])->withCookie($cookie);
        }

        return $this->errorResponse('Failed to refresh token', 401);
    }

    public function addTokenToCookie($token)
    {
        $cookie = cookie('token', $token, 60 * 24 * 7, '/', null, true, true);

        return $cookie;
    }
}

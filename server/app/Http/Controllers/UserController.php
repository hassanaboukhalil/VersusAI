<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private AuthService $authService;
    private UserService $userService;

    public function __construct(AuthService $authService, UserService $userService)
    {
        $this->authService = $authService;
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        try {
            $user = $this->authService->me();

            if ($user) {
                return $this->successResponse($user, 'User retrieved successfully');
            }

            return $this->errorResponse('User not authenticated', 401);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve user', 500);
        }
    }

    public function updateUserData(Request $request)
    {
        $result = $this->userService->updateUserData($request);

        if ($result) {
            return $this->successResponse(['data' => $result], 'User data has been updated.');
        }

        return $this->errorResponse('Something went wrong, try again later');
    }
}

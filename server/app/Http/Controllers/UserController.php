<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isArray;

class UserController extends Controller
{
    private AuthService $authService;
    private UserService $userService;

    public function __construct(AuthService $authService, UserService $userService)
    {
        $this->authService = $authService;
        $this->userService = $userService;
    }

    // public function index(Request $request)
    // {
    //     try {
    //         $user = $this->authService->me($request);

    //         if ($user) {
    //             return $this->successResponse($user, 'User retrieved successfully');
    //         }

    //         return $this->errorResponse('User not authenticated', 401);
    //     } catch (\Exception $e) {
    //         return $this->errorResponse('Failed to retrieve user', 500);
    //     }
    // }


    public function me(Request $request)
    {
        try {
            $user = $this->authService->me($request);

            if ($user) {
                return $this->successResponse($user, 'User retrieved successfully');
            }

            return $this->errorResponse('User not authenticated', 401);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve user', 500);
        }
    }

    public function getUserByUsername($username)
    {
        try {
            $user = $this->userService->getUserByUsername($username);

            if (!$user) {
                return $this->errorResponse('User not found', 404);
            }

            return $this->successResponse($user, 'User retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Something went Wrong', 500);
        }
    }

    public function updateUserData(Request $request)
    {
        $result = $this->userService->updateUserData($request);

        if (!$result) {
            return $this->errorResponse('Something went wrong, try again later');
        }

        if (!isArray($result)) {
            return $this->errorResponse($result);
        }

        return $this->successResponse($result, 'User data has been updated.');
    }
}

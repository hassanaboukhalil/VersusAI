<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        try {
            $authService = new AuthService();
            $user = $authService->me();

            if ($user) {
                return $this->successResponse($user, 'User retrieved successfully');
            }

            return $this->errorResponse('User not authenticated', 401);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve user', 500);
        }
    }
}

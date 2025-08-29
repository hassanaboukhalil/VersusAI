<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    use ResponseTrait;

    public function signup(Request $request)
    {
        $user = User::create([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $credentials = [
            'email' => $request['email'],
            'password' => $request['password']
        ];

        $token = Auth::attempt($credentials);

        if (!$token) {
            return null;
        }

        $user = Auth::user();

        return $this->getUserData($user, $token);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request['email'],
            'password' => $request['password']
        ];

        $token = Auth::attempt($credentials);

        if (!$token) {
            return null;
        }

        $user = Auth::user();

        return $this->getUserData($user, $token);
    }

    public function logout()
    {
        Auth::logout();

        return ['message' => 'Logged out successfully'];
    }

    public function me(): Authenticatable
    {
        $user = Auth::user();

        if (! $user) {
            throw new AuthenticationException('User not authenticated');
        }

        return $user;
    }



    /**
     * Refresh the token.
     *
     * @return string New JWT token
     *
     * @throws AuthenticationException If token refresh fails
     */
    public function refresh()
    {
        try {
            $token = Auth::refresh();

            if (! $token) {
                throw new AuthenticationException('Failed to refresh token');
            }

            // $user = Auth::user();

            // return $this->getUserData($user, $token);
            return $token;
        } catch (JWTException $e) {
            throw new AuthenticationException('Failed to refresh token: ' . $e->getMessage());
        }
    }

    private function getUserData($user, $token)
    {
        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'is_premium' => $user->is_premium,
            'bio' => $user->bio,
            'profile_picture_url' => $user->profile_picture_url,
            'bg_picture_url' => $user->bg_picture_url,
            'token' => $token,
        ];
    }

    // private function prepareUserWithToken(User $user, $token)
    // {
    //     return [
    //         'user' => $this->getUserData($user, $token),
    //         // 'token' => $token ?? $user->token, // TODO: check if this is correct
    //         // 'token' => $token,
    //         'token_type' => 'bearer',
    //     ];
    // }
}

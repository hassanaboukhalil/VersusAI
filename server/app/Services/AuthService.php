<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // Log the user in using Laravel's session authentication
        Auth::login($user);

        return $this->getUserData($user);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request['email'],
            'password' => $request['password']
        ];

        if (!Auth::attempt($credentials)) {
            return null;
        }

        return $this->getUserData(Auth::user());
    }

    public function logout(Request $request)
    {
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();

        return ['message' => 'Logged out successfully'];
    }

    public function user()
    {
        $user = Auth::user();
        return $user ? $this->getUserData($user) : null;
    }

    private function getUserData($user)
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
            'bg_picture_url' => $user->bg_picture_url
        ];
    }
}

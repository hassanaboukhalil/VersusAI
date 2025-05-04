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

        $credentials = [
            "email" => $request['email'],
            'password' => $request['password']
        ];

        $token = Auth::attempt($credentials);
        if ($token) {
            $user = Auth::user();
            $user->token = $token;
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
                'token' => $token

            ];
        }
        return null;
    }
}

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
            return $user;
        }
        return null;
    }
}

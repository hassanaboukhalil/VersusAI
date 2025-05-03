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
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);
        if ($token) {
            $user = Auth::user();
            $user->token = $token;
            return $user;
        }
        return null;
    }
}

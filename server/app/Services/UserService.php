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
use Illuminate\Support\Str;


class UserService
{
    use ResponseTrait;

    public function updateUserData(Request $request)
    {
        $user_id = $request->user_id;
        $first_name = $request->first_name;
        $last_name = $request->last_name;
        $username = $request->username;
        $bio = $request->bio;

        $user = User::find($user_id);

        if (!$user) {
            return null;
        }

        $isUsernameTaken = User::where('username', $username)->exists();

        if ($isUsernameTaken) {
            return null;
        }

        $user->first_name = $first_name;
        $user->last_name = $last_name;
        $user->username = $username;
        $user->bio = $bio;
        $user->save();

        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'bio' => $user->bio,
        ];
    }

    public function getUserByUsername($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return null;
        }

        return $user;
    }
}

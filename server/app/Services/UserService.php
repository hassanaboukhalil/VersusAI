<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        $isUsernameTaken = User::where('username', $username)->exists() && $username != $user->username;

        if ($isUsernameTaken) {
            return null;
        }

        // Handle profile picture upload
        $this->handleProfilePictureUpload($request, $user);

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
            'profile_picture_url' => Storage::url($user->profile_picture_url)
        ];
    }

    public function getUserByUsername($username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return null;
        }

        return $this->getUserData($user);
    }


    private function getUserData($user)
    {
        return [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'bio' => $user->bio,
            'profile_picture_url' => Storage::url($user->profile_picture_url),
            'bg_picture_url' => Storage::url($user->bg_picture_url),
        ];
    }

    private function handleProfilePictureUpload($request, $user)
    {
        if ($request->hasFile('profile_picture')) {
            $request->validate([
                'profile_picture' => [
                    'required',
                    'image',
                    'mimes:jpeg,png,jpg',
                    'max:2048', // 2mb max size
                ],
            ]);

            // Delete old profile picture if it exists and is not the default
            if (
                $user->profile_picture_url &&
                $user->profile_picture_url !== 'images/profiles/615c5093-d25d-4ec4-99b9-dabd0af7feef.jpeg' &&
                Storage::disk('public')->exists($user->profile_picture_url)
            ) {
                Storage::disk('public')->delete($user->profile_picture_url);
            }

            // Generate a unique filename using UUID
            $profile_picture = $request->file('profile_picture');
            $profile_extension = $profile_picture->getClientOriginalExtension();
            $profile_filename = Str::uuid() . '.' . $profile_extension;

            // Store the file in the public disk under images/profiles directory
            $profile_path = $profile_picture->storeAs('images/profiles', $profile_filename, 'public');

            // Save the relative path in the database
            $user->profile_picture_url = $profile_path;
        }
    }
}

<?php

namespace App\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Illuminate\Support\Facades\Auth;

class RefreshTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // try {
        //     // Try to authenticate with current token
        //     $user = JWTAuth::parseToken()->authenticate();
        //     return $next($request);
        // } catch (TokenExpiredException $e) {
        //     // Token is expired, try to refresh it
        //     try {
        //         // $newToken = JWTAuth::refresh(JWTAuth::getToken());
        //         // $newToken = JWTAuth::parseToken()->refresh();
        //         $newToken = Auth::refresh();

        //         // Set new token in cookie
        //         $cookie = cookie('token', $newToken, 2, '/', null, true, true);

        //         // Continue with the request using new token
        //         // auth()->setToken($newToken);
        //         $request->headers->set('Authorization', 'Bearer ' . $newToken);
        //         $response = $next($request);

        //         // Add new token to response
        //         // return $response->withCookie($cookie)->header('New-Token', $newToken);
        //         return $response->withCookie($cookie);
        //     } catch (JWTException $e) {
        //         // Refresh failed, return 401
        //         return response()->json(['error' => 'Token refresh faileddddddddd'], 401);
        //     }
        // } catch (JWTException $e) {
        //     // Invalid token
        //     return response()->json(['error' => 'Invalid tokennnnnnnnn'], 401);
        // }

        return $next($request);
    }
}

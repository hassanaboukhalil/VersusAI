import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the path of the request
    const path = request.nextUrl.pathname;

    // Define which paths are considered "private"
    const isPrivatePath =
        path.startsWith('/explore') ||
        path.startsWith('/battles') ||
        path.startsWith('/profile') ||
        path.startsWith('/pricing');

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value;

    // Check if the user is logged in (token exists)
    const isLoggedIn = !!token;

    // If it's a private path and the user is not logged in, redirect to login
    if (isPrivatePath && !isLoggedIn) {
        // Store the original URL to redirect back after login
        const url = new URL('/login', request.url);
        // url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // clone the request headers
    const requestHeaders = new Headers(request.headers);

    // Add the Authorization header with the token from httpOnly cookie
    requestHeaders.set('Authorization', `Bearer ${token}`);

    // Return the request with modified headers
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

// Specify which paths this middleware should run on
export const config = {
    matcher: [
        // Add matcher patterns for paths that should go through this middleware
        '/explore/:path*',
        '/battles/:path*',
        '/profile/:path*',
        '/pricing/:path*',
    ],
};

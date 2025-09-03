<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-domain operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    // Which paths should have CORS headers applied:
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Allowed origins (your Vercel front-end URL, staging, etc.):
    'allowed_origins' => [
        'https://versus-ai-kappa.vercel.app/',
        'http://localhost:3000',
    ],

    // Or use ['*'] to allow all:
    'allowed_origins_patterns' => [],

    // Allowed HTTP methods and headers (you can leave these as wildcard):
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],

    // Expose these headers to the browser:
    'exposed_headers' => [],

    // Whether to allow cookies/auth credentials:
    'supports_credentials' => true,

    // How long (in seconds) to cache a preflight response:
    'max_age' => 0,

];

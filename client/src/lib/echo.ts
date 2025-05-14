import PusherJs from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof PusherJs;
    }
}

// Using any here since the exact typing is complex
let Echo: any = null;

if (typeof window !== 'undefined') {
    const initializeEcho = async () => {
        try {
            const { default: Pusher } = await import('pusher-js');
            const { default: LaravelEcho } = await import('laravel-echo');

            window.Pusher = Pusher;

            // Configure Echo to use local Pusher server
            Echo = new LaravelEcho({
                broadcaster: 'pusher',
                key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
                wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST || '127.0.0.1',
                wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT
                    ? parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT, 10)
                    : 6001,
                wssPort: process.env.NEXT_PUBLIC_PUSHER_PORT
                    ? parseInt(process.env.NEXT_PUBLIC_PUSHER_PORT, 10)
                    : 6001,
                forceTLS: false,
                encrypted: false,
                disableStats: true,
                enabledTransports: ['ws'],
            });

            console.log(
                'Echo initialized with local server at:',
                process.env.NEXT_PUBLIC_PUSHER_HOST || '127.0.0.1',
                process.env.NEXT_PUBLIC_PUSHER_PORT || 6001
            );
        } catch (error) {
            console.error('Failed to initialize Echo:', error);
        }
    };

    initializeEcho();
}

export default Echo;

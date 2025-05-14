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

            Echo = new LaravelEcho({
                broadcaster: 'pusher',
                key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'eu',
                forceTLS: true,
                wsHost: window.location.hostname,
                wsPort: 6001,
                disableStats: true,
                enabledTransports: ['ws', 'wss'],
            });

            console.log('Echo initialized with key:', process.env.NEXT_PUBLIC_PUSHER_APP_KEY);
        } catch (error) {
            console.error('Failed to initialize Echo:', error);
        }
    };

    initializeEcho();
}

export default Echo;

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

if (typeof window !== 'undefined') {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'eu',
        forceTLS: true,
    });
}

export default window.Echo;

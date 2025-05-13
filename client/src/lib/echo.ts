let Echo: any = null;

if (typeof window !== 'undefined') {
    const initializeEcho = async () => {
        const { default: Pusher } = await import('pusher-js');
        const { default: LaravelEcho } = await import('laravel-echo');

        window.Pusher = Pusher;

        Echo = new LaravelEcho({
            broadcaster: 'pusher',
            key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'eu',
            forceTLS: true,
        });
    };

    initializeEcho();
}

export default Echo;

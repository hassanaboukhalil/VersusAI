'use client';

// import { loadStripe } from '@stripe/stripe-js';
import api from '../../../lib/axios';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { useState } from 'react';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutButton = ({ buttonText, disabled }: { buttonText: string; disabled: boolean }) => {
    const [loading, setLoading] = useState(false);
    // const router = useRouter();

    const handleClick = async () => {
        setLoading(true);

        try {
            const res = await api.post('/pay');

            if (res.data.url) {
                const data = res.data;
                window.location.href = data.url;
                // toast.('please wait');
            } else {
                toast.error('something went wrong');
            }
        } catch (error) {
            const message = 'something went wrong';
            console.error('something went wrong:', error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="submit"
            className="w-full bg-primary text-black hover:opacity-90"
            isLoading={loading}
            loadingText="Please wait..."
            onClick={handleClick}
            disabled={disabled}
        >
            {buttonText}
        </Button>
    );
};

export default CheckoutButton;

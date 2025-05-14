'use client';

import { loadStripe } from '@stripe/stripe-js';
import api from '../../../lib/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutButton = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);

        try {
            const res = await api.post('/pay');

            if (res.data.success) {
                const data = res.data.data;
                router.push('/explore');
                toast.success('Login successful');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            const message = 'Login failed';
            console.error('login failed:', error);
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
            loadingText="Logging in..."
            onClick={handleClick}
        >
            Subscribe Now
        </Button>
    );
};

export default CheckoutButton;

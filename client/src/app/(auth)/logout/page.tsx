'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeUser } from '../../../lib/auth';
import { toast } from 'sonner';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Perform logout
        if (typeof window !== 'undefined') {
            removeUser();

            // Redirect to home page
            setTimeout(() => {
                router.push('/');
                toast.success('You have been successfully logged out');
            }, 100); // Small delay to ensure cookies are cleared
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-background flex justify-center items-center">
            <div className="text-white text-center">
                <h1 className="text-2xl font-bold">Logging out...</h1>
                <p className="mt-2">Please wait while we log you out.</p>
            </div>
        </div>
    );
}

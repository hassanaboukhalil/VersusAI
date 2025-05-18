'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import api from '../../../lib/axios';
import Logo from '../../../components/layout/Logo';
import Section from '../../../components/layout/Section';
import { setPremium } from '../../../lib/auth';

// Client component that uses useSearchParams
function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('Verifying payment...');
    const router = useRouter();

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) return;

            try {
                // const res = await axios.get(
                //     `http://127.0.0.1:8000/api/v1/payment-success?session_id=${sessionId}`,
                //     { withCredentials: true }
                // );

                const res = await api.get(`/payment-success?session_id=${sessionId}`, {
                    withCredentials: true,
                });

                if (res.data.message) {
                    setStatus('✅ Payment successful and recorded.');
                    setPremium(true);
                    router.push('/explore');
                } else {
                    setStatus('⚠️ Could not verify payment.');
                }
            } catch (err) {
                console.error(err);
                setStatus('❌ Error verifying payment.');
            }
        };

        verifyPayment();
    }, [sessionId, router]);

    return (
        <Section className="p-10 text-center h-screen flex flex-col items-center justify-center gap-4">
            <Logo withTitle={true} />
            <h1 className="text-3xl font-bold text-green-600 mt-10">Payment Result</h1>
            <p className="mt-4">{status}</p>
        </Section>
    );
}

// Main page component with Suspense boundary
const PaymentSuccessPage = () => {
    return (
        <Suspense
            fallback={
                <Section className="p-10 text-center h-screen flex flex-col items-center justify-center gap-4">
                    <Logo withTitle={true} />
                    <h1 className="text-3xl font-bold mt-10">Loading...</h1>
                </Section>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
};

export default PaymentSuccessPage;

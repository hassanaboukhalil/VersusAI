'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import Logo from '../../../components/layout/Logo';
import Section from '../../../components/layout/Section';

const PaymentSuccessPage = () => {
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
    }, [sessionId]);

    return (
        <Section className="p-10 text-center h-screen flex flex-col items-center justify-center gap-4">
            <Logo withTitle={true} />
            <h1 className="text-3xl font-bold text-green-600 mt-10">Payment Result</h1>
            <p className="mt-4">{status}</p>
        </Section>
    );
};
export default PaymentSuccessPage;

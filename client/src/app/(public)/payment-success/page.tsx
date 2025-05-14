import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../lib/axios';

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('Verifying payment...');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) return;

            try {
                // const res = await axios.get(
                //     `http://127.0.0.1:8000/api/v1/payment-success?session_id=${sessionId}`,
                //     { withCredentials: true }
                // );

                const res = await api.get('/payment-success?session_id=${sessionId}', {
                    withCredentials: true,
                });

                if (res.data.message) {
                    setStatus('✅ Payment successful and recorded.');
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
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">Payment Result</h1>
            <p className="mt-4">{status}</p>
        </div>
    );
};
export default PaymentSuccessPage;

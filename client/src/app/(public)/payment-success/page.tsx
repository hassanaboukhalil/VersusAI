import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const page = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('Verifying payment...');

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">Payment Result</h1>
            <p className="mt-4">{status}</p>
        </div>
    );
};
export default page;

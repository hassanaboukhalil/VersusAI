import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const page = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('Verifying payment...');
    return <div>page</div>;
};
export default page;

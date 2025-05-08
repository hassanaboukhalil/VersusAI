import axios from 'axios';
import { getUser } from './auth';

// const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;
const BASE_URL = `http://35.181.172.250:8000/api/v1`; // http://127.0.0.1:8000 http://15.237.122.116

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
        const user = getUser();
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    });
}

export default api;

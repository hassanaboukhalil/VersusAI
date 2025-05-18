import axios from 'axios';
import { getUser } from './auth';

// const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_STAGING}/api/v1`;

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

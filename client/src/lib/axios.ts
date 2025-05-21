import axios from 'axios';
import { getUser } from './auth';

// const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION}/api/v1`;
// const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_STAGING}/api/v1`;

// const origin = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
// const BASE_URL = `http://${origin}:8000/api/v1`;

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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

import axios from 'axios';
import { getUser } from './auth';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/v1',
    baseURL: 'http://127.0.0.1:8000/api/v1',
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

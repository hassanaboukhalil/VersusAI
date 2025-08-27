import axios from 'axios';
import { getUser } from './auth';

const BASE_URL = `http://localhost:8000/api/v1`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        // Accept: 'application/json',
    },
    withCredentials: true,
    // withXSRFToken: true,
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

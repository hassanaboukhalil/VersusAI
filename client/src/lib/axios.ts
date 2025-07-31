import axios from 'axios';
import { getUser, setUser, removeUser } from './auth';

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
    // Request interceptor
    api.interceptors.request.use((config) => {
        const user = getUser();
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    });

    // Response interceptor for handling 401s
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const user = getUser();
                    if (user?.token) {
                        const response = await api.post('/refresh');
                        const newUserData = response.data.data;
                        setUser(newUserData);

                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newUserData.token}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh failed, logout user
                    removeUser();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
}

export default api;

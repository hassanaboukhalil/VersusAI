import axios, { AxiosError } from 'axios';
import { getUser, removeUser, setUser } from './auth';

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

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        // Check if server sent a new token
        const newToken = response.headers['new-token'];
        if (newToken) {
            const user = getUser();
            if (user) {
                setUser({ ...user, token: newToken });
            }
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshResponse = await axios.post(
                    `${BASE_URL}/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = refreshResponse.data.data.token;
                const user = getUser();

                if (user && newToken) {
                    setUser({ ...user, token: newToken });

                    // Retry the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, logout user
                removeUser();
                window.location.href = '/login';
                return Promise.reject(refreshError);
                // console.log(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

import axios from 'axios';
import { removeUser, setUser } from './auth';

const BASE_URL = `http://localhost:8000/api/v1`;
const SANCTUM_BASE_URL = `http://localhost:8000`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // Essential for session-based auth
});

// Function to get CSRF token before authentication requests
export const getCsrfToken = async () => {
    try {
        await axios.get(`${SANCTUM_BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
    }
};

// if (typeof window !== 'undefined') {
//     // Simple 401 error handling for session-based auth
//     api.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             if (error.response?.status === 401) {
//                 // Session expired or user not authenticated
//                 removeUser();
//                 window.location.href = '/login';
//             }
//             return Promise.reject(error);
//         }
//     );
// }

export default api;

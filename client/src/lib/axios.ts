import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    // baseURL: 'http://13.37.211.34/api/v1',
    baseURL: 'http://127.0.0.1:8000/api/v1',

    headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    },
});

export default api;

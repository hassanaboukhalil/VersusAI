import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    // baseURL: 'http://13.37.211.34/api/v1',
    baseURL: 'http://localhost/api/v1',

    headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    },
});

export default api;

import { User } from '../types/user';
import { STORAGE_KEYS } from '../constants/storage';
import api, { getCsrfToken } from './axios';

export function getUser(): User | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    try {
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

export function setUser(user: User) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export async function login(email: string, password: string) {
    try {
        // Get CSRF token before authentication
        await getCsrfToken();

        const response = await api.post('/login', { email, password });
        const user = response.data.data;

        setUser(user);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function signup(userData: any) {
    try {
        // Get CSRF token before authentication
        await getCsrfToken();

        const response = await api.post('/signup', userData);
        const user = response.data.data;

        setUser(user);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        // Call logout API (clears session)
        await api.post('/logout');
    } catch {
        // Continue even if API fails
    } finally {
        // Clear user data from localStorage
        removeUser();
        // Redirect to login
        window.location.href = '/login';
    }
}

export async function fetchUser() {
    try {
        const response = await api.get('/user');
        const user = response.data.data;
        setUser(user);
        return user;
    } catch {
        removeUser();
        return null;
    }
}

export function setPremium(isPremium: boolean) {
    if (typeof window === 'undefined') return;

    const user = getUser();
    if (!user) return;

    user.is_premium = isPremium;
    setUser(user);
    return isPremium;
}

export function removeUser() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
}

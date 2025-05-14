import { User } from '../types/user';
import { STORAGE_KEYS } from '../constants/storage';

export function getUser(): User | null {
    if (typeof window === 'undefined') {
        return null; // Can't access localStorage on the server
    }

    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    try {
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

export function setUser(user: User) {
    if (typeof window === 'undefined') return; // Server-side guard

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    // Also set auth token in cookie for middleware
    document.cookie = `auth_token=${user.token}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
}

export function isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!getUser();
}

export function removeUser() {
    if (typeof window === 'undefined') return; // Server-side guard

    localStorage.removeItem(STORAGE_KEYS.USER);

    // Remove auth token cookie
    document.cookie = 'auth_token=; path=/; max-age=0';
}

export function getToken(): string | null {
    return getUser()?.token ?? null;
}

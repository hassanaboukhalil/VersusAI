import { User } from '../types/user';
import { STORAGE_KEYS } from '../constants/storage';

export function getUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    try {
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

export function setUser(user: User) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function isLoggedIn(): boolean {
    return !!getUser();
}

export function removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
}

export function getToken(): string | null {
    return getUser()?.token ?? null;
}

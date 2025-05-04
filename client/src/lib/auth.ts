import { User } from '../types/user';
import { STORAGE_KEYS } from '../constants/storage';

export function setUser(user: User) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

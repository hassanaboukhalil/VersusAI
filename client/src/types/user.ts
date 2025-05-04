export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_premium: boolean;
    bio?: string | null;
    profile_picture_url?: string | null;
    bg_picture_url?: string | null;
    token: string;
}

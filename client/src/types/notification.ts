export interface Notification {
    id: number | string;
    type: 'follow' | 'vote' | 'comment' | 'mention';
    user: {
        name: string;
        avatar: string;
    };
    message: string;
    isRead?: boolean;
    createdAt?: string;
}

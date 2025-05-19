export interface Notification {
    id: number | string;
    type: 'follow' | 'vote' | 'comment' | 'mention';
    notifier_name: string;
    message: string;
    isRead?: boolean;
    createdAt?: string;
}

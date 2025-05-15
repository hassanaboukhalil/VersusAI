import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types/notification';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
}

const initialState: NotificationState = {
    notifications: [
        {
            id: 1,
            type: 'follow',
            user: {
                name: 'Yehya Lorem',
                avatar: '/images/no-user-profile-pic.jpeg',
            },
            message: 'started following you.',
            isRead: false,
            createdAt: new Date().toISOString(),
        },
    ],
    unreadCount: 1,
    loading: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        fetchNotificationsStart(state) {
            state.loading = true;
        },
        fetchNotificationsSuccess(state, action: PayloadAction<Notification[]>) {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(
                (notification) => !notification.isRead
            ).length;
            state.loading = false;
        },
        fetchNotificationsFailure(state) {
            state.loading = false;
        },
        addNotification(state, action: PayloadAction<Notification>) {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        markAsRead(state, action: PayloadAction<number | string>) {
            const notification = state.notifications.find((n) => n.id === action.payload);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead(state) {
            state.notifications.forEach((notification) => {
                notification.isRead = true;
            });
            state.unreadCount = 0;
        },
        removeNotification(state, action: PayloadAction<number | string>) {
            const notification = state.notifications.find((n) => n.id === action.payload);
            if (notification && !notification.isRead) {
                state.unreadCount -= 1;
            }
            state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        },
        clearAllNotifications(state) {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
});

export const {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;

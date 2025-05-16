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
            notifier_name: 'Yehya Lorem',
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
        setNotifications(state, action: PayloadAction<Notification[]>) {
            state.notifications = action.payload;
        },
    },
});

export const { setNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;

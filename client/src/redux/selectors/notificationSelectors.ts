import { RootState } from '../store';

export const selectNotifications = (state: RootState) => state.notification.notifications;
export const selectUnreadCount = (state: RootState) => state.notification.unreadCount;
export const selectIsLoadingNotifications = (state: RootState) => state.notification.loading;

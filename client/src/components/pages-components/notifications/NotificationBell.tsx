'use client';

import { Bell } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import api from '../../../lib/axios';
import { setNotifications } from '../../../redux/slices/notificationSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../../redux/store';

const NotificationBell = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        api.get('/notifications').then((res) => {
            dispatch(setNotifications(res.data.data));
            console.log(res.data);
        });
    }, []);

    const notifications = useSelector((state: RootState) => state.notification.notifications);

    return (
        <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="text-primary" width="35" height="35" />
                {notifications.filter((notification) => !notification.isRead).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications.filter((notification) => !notification.isRead).length > 99
                            ? '99+'
                            : notifications.filter((notification) => !notification.isRead).length}
                    </span>
                )}
            </Button>
        </Link>
    );
};

export default NotificationBell;

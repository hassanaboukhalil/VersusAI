'use client';

import { Bell } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUnreadCount } from '../../../redux/selectors/notificationSelectors';

const NotificationBell = () => {
    const unreadCount = useSelector(selectUnreadCount);

    return (
        <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="text-primary" width="35" height="35" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </Button>
        </Link>
    );
};

export default NotificationBell;

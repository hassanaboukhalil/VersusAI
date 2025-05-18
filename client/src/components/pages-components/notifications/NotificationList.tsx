'use client';

import { Star, User } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface NotificationListProps {
    className?: string;
}

const NotificationList = ({ className = '' }: NotificationListProps) => {
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    return (
        <div
            className={`border border-lime-300 rounded-md max-h-[500px] overflow-y-auto p-4 space-y-4 bg-dark-white ${className}`}
        >
            {notifications.map((notification, i) => (
                <div key={i} className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-1">
                        {notification.type === 'vote' ? (
                            <Star className="text-purple-500 fill-purple-500 w-5 h-5" />
                        ) : (
                            <User className="text-white w-5 h-5" />
                        )}
                    </div>

                    {/* Avatar and Message */}
                    <div className="flex items-start gap-2">
                        <Image
                            src="/images/no-user-profile-pic.jpeg"
                            // alt={notification.notifier_name}
                            alt="user avatar"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <p className="text-sm">
                            <span className="font-semibold text-white">
                                {notification.notifier_name}
                            </span>{' '}
                            <span className="text-gray-300">{notification.message}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;

import { Star, User } from 'lucide-react';
import Section from '../../../components/layout/Section';
import Image from 'next/image';

const page = () => {
    const notifications = [
        {
            id: 1,
            type: 'follow',
            user: {
                name: 'Yehya Lorem',
                avatar: '/images/no-user-profile-pic.jpeg',
            },
            message: 'started following you.',
        },
        ...Array(10).fill({
            id: Math.random(),
            type: 'vote',
            user: {
                name: 'Yehya Lorem',
                avatar: '/images/no-user-profile-pic.jpeg',
            },
            message: 'voted on the battle titled by "Onsite or Remote Work"',
        }),
    ];

    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Notifications</h1>

            <div className="border border-lime-300 rounded-md max-h-[500px] overflow-y-auto p-4 space-y-4 bg-dark-white">
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
                                src={notification.user.avatar}
                                alt={notification.user.name}
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <p className="text-sm">
                                <span className="font-semibold text-white">
                                    {notification.user.name}
                                </span>{' '}
                                <span className="text-gray-300">{notification.message}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
export default page;

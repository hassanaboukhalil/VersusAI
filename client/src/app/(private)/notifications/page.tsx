'use client';

import Section from '../../../components/layout/Section';
import NotificationList from '../../../components/pages-components/notifications/NotificationList';

const page = () => {
    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Notifications</h1>
            <NotificationList />
        </Section>
    );
};

export default page;

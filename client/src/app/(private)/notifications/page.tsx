import Section from '../../../components/layout/Section';

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
        </Section>
    );
};
export default page;

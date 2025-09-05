'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import Section from '../../../../components/layout/Section';
import BattleCards from '../../../../components/global/BattleCards';
import { CardsSkeleton } from '../../../../components/ui/Skeletons';

const ProfilePage = () => {
    const { username } = useParams();
    const [battles, setBattles] = useState(null);

    useEffect(() => {
        api.get(`/battles/${username}`)
            .then((res) => {
                if (res.data.success) {
                    setBattles(res.data.data);
                }
            })
            .catch((error) => console.error('Failed to fetch battles: ', error));
    }, []);

    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Profile Page</h1>

            {!battles ? <CardsSkeleton /> : <BattleCards battles={battles} />}
        </Section>
    );
};
export default ProfilePage;

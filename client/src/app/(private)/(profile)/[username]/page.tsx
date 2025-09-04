'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import Section from '../../../../components/layout/Section';
import BattleCards from '../../../../components/global/BattleCards';
import { Battle } from '../../../../types/battle';

const ProfilePage = () => {
    // const { username } = useParams();
    // const [battles, setBattles] = useState<Battle[]>([]);

    // useEffect(() => {

    //     // api.get(`/users/${username}`)
    //     // .then((res) => {

    //     // })

    //     api.get(`/battles/${user_id}`)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 setBattles(res.data.data);
    //                 console.log(res.data);
    //             }
    //         })
    //         .catch((error) => console.error('Failed to fetch battles: ', error));
    // }, []);

    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Profile Page</h1>

            {/* <BattleCards battles={battles} /> */}
        </Section>
    );
};
export default ProfilePage;

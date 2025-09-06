'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import Section from '../../../../components/layout/Section';
import BattleCards from '../../../../components/global/BattleCards';
import { CardsSkeleton } from '../../../../components/ui/Skeletons';
import Image from 'next/image';

const ProfilePage = () => {
    const { username } = useParams();
    const [battles, setBattles] = useState(null);

    useEffect(() => {
        api.get(`/battles/${username}`)
            .then((res) => {
                if (res.data.success) {
                    setBattles(res.data.data);
                    console.log(res.data.data);
                }
            })
            .catch((error) => console.error('Failed to fetch battles: ', error));
    }, []);

    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Profile Page</h1>
            <div>
                {Array.isArray(battles) && battles[0]?.user_cover_pic_url && (
                    <Image
                        className="w-full"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_cover_pic_url}`}
                        // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                        width={626}
                        height={352}
                        alt="cover image"
                    />
                )}
            </div>

            {!battles ? <CardsSkeleton /> : <BattleCards battles={battles} />}
        </Section>
    );
};
export default ProfilePage;

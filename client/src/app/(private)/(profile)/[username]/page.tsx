'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import Section from '../../../../components/layout/Section';
import BattleCards from '../../../../components/global/BattleCards';
import { CardsSkeleton } from '../../../../components/ui/Skeletons';
import Image from 'next/image';
import { Battle } from '../../../../types/battle';
import { Button } from '../../../../components/ui/button';

const ProfilePage = () => {
    const { username } = useParams();
    const [battles, setBattles] = useState<Battle[] | null>(null);

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
            <div className="relative">
                {Array.isArray(battles) && battles[0]?.user_cover_pic_url && (
                    <Image
                        className="w-full h-75"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_cover_pic_url}`}
                        // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                        width={626}
                        height={352}
                        alt="cover image"
                    />
                )}

                {/* {Array.isArray(battles) && battles[0]?.user_profile_pic_url && (
                    <Image
                        className="rounded-full mb-4 z-10 w-36 h-36 absolute left-2 top-[75%]"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_profile_pic_url}`}
                        // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                        width={224}
                        height={224}
                        alt="profile image"
                    />
                )} */}

                <div className="flex items-end justify-between w-full h-12">
                    {Array.isArray(battles) && battles[0]?.user_profile_pic_url && (
                        <Image
                            className="rounded-full ml-4 z-10 w-36 h-36 border border-black"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_profile_pic_url}`}
                            // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                            width={224}
                            height={224}
                            alt="profile image"
                        />
                    )}
                    <Button variant="outline">Edit Profile</Button>
                </div>
            </div>

            <div className="mt-8">
                {!battles ? <CardsSkeleton /> : <BattleCards battles={battles} />}
            </div>
        </Section>
    );
};
export default ProfilePage;

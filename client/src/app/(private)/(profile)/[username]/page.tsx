'use client';

import { notFound, useParams } from 'next/navigation';
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
    const [userNotFound, setUserNotFound] = useState(false);
    // const router = useRouter();

    useEffect(() => {
        // checking if the user is found
        api.get(`/user/${username}`)
            .then((res) => {
                if (res.data.success) {
                    api.get(`/battles/${username}`)
                        .then((res) => {
                            if (res.data.success) {
                                setBattles(res.data.data);
                                console.log(res.data.data);
                            }
                        })
                        .catch((error) => console.error('Failed to fetch battles: ', error));
                }
            })
            .catch(() => {
                console.log('User not found');
                setUserNotFound(true);
            });
    }, []);

    if (userNotFound) {
        notFound();
    }

    return (
        <Section className="bg-background min-h-screen py-12 items-center">
            <h1 className="text-white text-3xl font-bold mb-8">Profile Page</h1>
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
            <div className="w-full px-4">
                {Array.isArray(battles) && battles[0]?.user_profile_pic_url && (
                    <div className="flex items-end justify-between w-full h-12">
                        <Image
                            className="rounded-full z-10 w-36 h-36 border border-black"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_profile_pic_url}`}
                            // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                            width={224}
                            height={224}
                            alt="profile image"
                        />
                        <Button variant="outline">Edit Profile</Button>
                    </div>
                )}

                {/* name, username and bio */}
                <div className="mt-8">
                    {!battles ? (
                        ''
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold">
                                {battles[0]?.user_first_name} {battles[0]?.user_last_name}
                            </h1>
                            <p className="text-sm text-gray-500">@{username}</p>
                            <p className="text-medium pt-2">This is the bio</p>
                        </>
                    )}
                </div>

                <div className="mt-8">
                    {!battles ? <CardsSkeleton /> : <BattleCards battles={battles} />}
                </div>
            </div>
        </Section>
    );
};
export default ProfilePage;

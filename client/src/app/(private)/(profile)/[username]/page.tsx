'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import Section from '../../../../components/layout/Section';
import BattleCards from '../../../../components/global/BattleCards';
import { CardsSkeleton } from '../../../../components/ui/Skeletons';
import Image from 'next/image';
import { Battle } from '../../../../types/battle';
import { Dialog, DialogTrigger } from '../../../../components/ui/dialog';
import EditProfileDialog from '../../../../components/pages-components/profile/EditProfileDialog';

const ProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
        profilePictureUrl: '',
        bgPictureUrl: '',
    });
    const [battles, setBattles] = useState<Battle[] | null>(null);
    const [userNotFound, setUserNotFound] = useState(false);
    const [isEditProfileDialogOpen, SetIsEditProfileDialogOpen] = useState(false);
    const [isMe, setIsMe] = useState(false);

    useEffect(() => {
        // checking if the user is found
        api.get(`/user/${username}`)
            .then((res) => {
                if (res.data.success) {
                    // setting the user data
                    setUser({
                        ...user,
                        firstName: res.data.data.first_name,
                        lastName: res.data.data.last_name,
                        username: res.data.data.username,
                        bio: res.data.data.bio,
                        profilePictureUrl: res.data.data.profile_picture_url,
                        bgPictureUrl: res.data.data.bg_picture_url,
                    });

                    // getting the battles created by this user
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

    // checking if the user is visiting their own profile
    useEffect(() => {
        if (user.username) {
            api.post('/user/me', {
                username: user.username,
            })
                .then((res) => {
                    if (res.data.success) {
                        setIsMe(true);
                    }
                })
                .catch(() => {
                    console.log('Failed to fetch user');
                });
        }
    }, [user.username]);

    if (userNotFound) {
        notFound();
    }

    return (
        <Section className="bg-background min-h-screen py-12 items-center">
            <h1 className="text-white text-3xl font-bold mb-8">Profile Page</h1>

            {/* Cover/background photo */}
            {user.bgPictureUrl != '' && (
                <Image
                    className="w-full h-75"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.bgPictureUrl}`}
                    // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${battles[0].user_cover_pic_url}`}
                    // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                    width={626}
                    height={352}
                    alt="cover image"
                />
            )}

            {/* Profile picture, Edit button if available and battles */}
            <div className="w-full px-4">
                {/* Profile picture and Edit button if available */}
                {user.profilePictureUrl != '' && (
                    <div className="flex items-end justify-between w-full h-12">
                        <Image
                            className="rounded-full z-10 w-36 h-36 border border-black"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.profilePictureUrl}`}
                            // src={`http://localhost:8000/${battles[0].user_cover_pic_url}`}
                            width={224}
                            height={224}
                            alt="profile image"
                        />

                        {isMe && (
                            <Dialog
                                open={isEditProfileDialogOpen}
                                onOpenChange={SetIsEditProfileDialogOpen}
                            >
                                <DialogTrigger className="border border-[#DEFE01] bg-background shadow-xs hover:bg-accent hover:text-accent-foreground size-fit leading-0 cursor-pointer h-9 px-4 py-2 rounded-md">
                                    Edit Profile
                                </DialogTrigger>
                                <EditProfileDialog
                                    onSuccess={() => SetIsEditProfileDialogOpen(false)}
                                />
                            </Dialog>
                        )}
                    </div>
                )}

                {/* name, username and bio */}
                <div className="mt-8">
                    {user && (
                        <>
                            <h1 className="text-2xl font-bold">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                            <p className="text-medium pt-2">{user.bio}</p>
                        </>
                    )}
                </div>

                {/* Battles */}
                <div className="mt-8">
                    {!battles ? <CardsSkeleton /> : <BattleCards battles={battles} />}
                </div>
            </div>
        </Section>
    );
};
export default ProfilePage;

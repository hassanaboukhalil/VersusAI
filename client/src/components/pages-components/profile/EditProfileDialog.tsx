'use client';

import { DialogContent, DialogTitle } from '../../ui/dialog';
import { DialogHeader } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useRef, useState } from 'react';
import api from '../../../lib/axios';
import { getUser, setUser } from '../../../lib/auth';
import { toast } from 'sonner';
// import Image from 'next/image';
// import UploadPhotoIcon from './UploadPhotoIcon';

const EditProfileDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const user = getUser();

    const [userData, setUserData] = useState({
        firstName: user?.first_name ? user?.first_name : '',
        lastName: user?.last_name ? user?.last_name : '',
        username: user?.username ? user?.username : '',
        bio: user?.bio ? user?.bio : '',
        profilePicture: null as File | null,
        bgPicture: null as File | null,
    });

    const profilePictureRef = useRef<HTMLInputElement>(null);
    const bgPictureRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        try {
            // create a FormData object for mutipart/form-data
            const formData = new FormData();

            // Adding text fields
            formData.append('user_id', user?.id?.toString() ?? '');
            formData.append('first_name', userData.firstName);
            formData.append('last_name', userData.lastName);
            formData.append('username', userData.username);
            formData.append('bio', userData.bio);

            // Add profile picture if selected
            if (profilePictureRef.current?.files?.[0]) {
                formData.append('profile_picture', profilePictureRef.current.files[0]);
            }

            // Add bg picture if selected
            if (bgPictureRef.current?.files?.[0]) {
                formData.append('bg_picture', bgPictureRef.current.files[0]);
            }

            const response = await api.post('/update-user-data', formData, {
                headers: {
                    'Content-Type': 'mulipart/form-data',
                },
            });

            if (response.data.success) {
                const updatedUser = response.data.data;
                setUser(updatedUser);
                onSuccess(); // close the dialog
                window.location.href = `/${updatedUser.username}`;
            } else {
                toast.error('Failed to update user data');
            }
        } catch (error) {
            toast.error('Failed to update user data');
            console.log(error);
        }
    };

    return (
        <DialogContent className="bg-[#121212] text-white max-w-2xl max-h-[90%] overflow-y-scroll">
            <DialogHeader className="mb-4">
                <DialogTitle className="text-white text-xl text-center">Edit Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
                <div>
                    <label className="text-lg block">First Name</label>
                    <Input
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        placeholder="john"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Last Name</label>
                    <Input
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Username</label>
                    <Input
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        placeholder="john_ak"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Bio</label>
                    <Input
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        placeholder="Your Bio"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block" htmlFor="profile_photo">
                        Profile Photo
                    </label>
                    <Input
                        type="file"
                        className="mt-1"
                        id="profile_photo"
                        ref={profilePictureRef}
                    />
                </div>

                <div>
                    <label className="text-lg block" htmlFor="cover_photo">
                        Cover Photo
                    </label>
                    <Input type="file" className="mt-1" id="cover_photo" ref={bgPictureRef} />
                </div>

                <Button
                    onClick={() => handleSubmit()}
                    variant="default"
                    className="w-full hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                    Save
                </Button>
            </div>
        </DialogContent>
    );
};
export default EditProfileDialog;

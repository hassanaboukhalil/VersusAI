'use client';

import { DialogContent, DialogTitle } from '../../ui/dialog';
import { DialogHeader } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useState } from 'react';
import api from '../../../lib/axios';
import { getUser, setUser } from '../../../lib/auth';
import { toast } from 'sonner';

const EditProfileDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const user = getUser();

    const [formData, setFormData] = useState({
        firstName: user?.first_name ? user?.first_name : '',
        lastName: user?.last_name ? user?.last_name : '',
        username: user?.username ? user?.username : '',
        bio: user?.bio ? user?.bio : '',
    });

    const handleSubmit = async () => {
        try {
            const response = await api.post('/update-user-data', {
                user_id: user?.id,
                first_name: formData.firstName,
                last_name: formData.lastName,
                username: formData.username,
                bio: formData.bio,
            });

            if (response.data.success) {
                const user = response.data.data;
                setUser(user);
                window.location.reload();
                onSuccess();
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
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="john"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Last Name</label>
                    <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Username</label>
                    <Input
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="john_ak"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg block">Bio</label>
                    <Input
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Your Bio"
                        className="mt-1"
                    />
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

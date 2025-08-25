'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/axios';
import Logo from '../../../components/layout/Logo';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { setUser, signup } from '../../../lib/auth';

const SignupPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            // const res = await api.post('/signup', formData);
            const res = await signup(formData);

            // if (res.data.success) {
            //     const user = res.data.data;
            //     setUser(user);
            //     router.push('/explore');
            // } else {
            //     toast.error(res.data.message);
            // }

            if (res) {
                router.push('/explore');
            } else {
                toast.error('Signup failed');
            }
        } catch {
            const message = 'Signup failed';
            console.error('Signup failed:', message);
            toast.error(message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex justify-center items-center">
            <div className="bg-[#121212] p-10 rounded-xl w-full max-w-md shadow-lg">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <Logo withTitle />
                    <h1 className="text-white text-2xl font-semibold">Sign Up</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <Input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full bg-primary text-black hover:opacity-90"
                    >
                        Sign Up
                    </Button>
                </form>

                <div className="text-center text-white mt-6">
                    <p className="mb-2">
                        Do you have an account?{' '}
                        <Link className="text-primary" href="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

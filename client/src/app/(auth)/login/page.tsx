'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/axios';
import Logo from '../../../components/layout/Logo';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { setUser } from '../../../lib/auth';

const SignupPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
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
            const res = await api.post('/login', formData);

            if (res.data.success) {
                const user = res.data.data;
                setUser(user);
                router.push('/explore');
            } else {
                toast.error(res.data.message);
            }
        } catch {
            const message = 'Signup failed';
            console.error('Signup failed:', message);
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-background flex justify-center items-center">
            <div className="bg-[#121212] p-10 rounded-xl w-full max-w-md shadow-lg">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <Logo withTitle />
                    <h1 className="text-white text-2xl font-semibold">Login</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Button type="submit" className="w-full bg-primary text-black hover:opacity-90">
                        Login
                    </Button>
                </form>

                <div className="text-center text-white mt-6">
                    <p className="mb-2">
                        Do not you have an account?{' '}
                        <Link className="text-primary" href="/signup">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

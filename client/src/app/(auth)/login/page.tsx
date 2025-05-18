'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../../lib/axios';
import Logo from '../../../components/layout/Logo';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { setUser } from '../../../lib/auth';

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/explore';
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            const res = await api.post('/login', formData);

            if (res.data.success) {
                const user = res.data.data;
                setUser(user);
                router.push(redirectPath);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            const message = 'Login failed';
            console.error('login failed:', error);
            toast.error(message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex justify-center items-center">
            <div className="bg-[#121212] p-10 rounded-xl w-full max-w-md shadow-lg">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <Logo withTitle />
                    <h1 className="text-white text-2xl font-semibold">Login</h1>
                    {redirectPath !== '/explore' && (
                        <p className="text-sm text-white/70">Please login to access this page</p>
                    )}
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
                    {/* <Button type="submit" className="w-full bg-primary text-black hover:opacity-90">
                        Login
                    </Button> */}
                    <Button
                        type="submit"
                        className="w-full bg-primary text-black hover:opacity-90"
                        isLoading={loading}
                        loadingText="Logging in..."
                    >
                        Login
                    </Button>
                </form>

                <div className="text-center text-white mt-6">
                    <p className="mb-2">
                        Don&apos;t have an account?{' '}
                        <Link className="text-primary" href="/signup">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

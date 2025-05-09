'use client';

import { PanelLeft } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/auth';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';

interface HeaderProps {
    onToggleSidebar: () => void;
    className?: string;
}

const Header = ({ className, onToggleSidebar }: HeaderProps) => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        // Client-side check (since localStorage is used)
        setLoggedIn(isLoggedIn());
    }, []);
    return (
        <div
            className={`bg-background w-full flex justify-between items-center py-6 ${className || ''}`}
        >
            <div className="flex sm:gap-4 lg:gap-12">
                <Logo withTitle />
                {/* Sidebar Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <PanelLeft className="w-5 h-5 text-white" />
                </Button>
            </div>
            {loggedIn ? (
                // <Button className="default">Create Battle</Button>
                <Dialog>
                    <DialogTrigger className="bg-[#DEFE01] shadow-xs hover:bg-primary/90 text-[#000000] size-fit leading-0 cursor-pointer h-9 px-4 py-2 has-[>svg]:px-3 rounded-md">
                        Create Battle
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ) : (
                <Button variant="default">
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </div>
    );
};
export default Header;

'use client';

import { PanelLeft } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../lib/auth';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '../ui/dialog';
import CreateBattleDialog from '../global/CreateBattleDialog';

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
                    <DialogTrigger className="bg-[#DEFE01] text-black h-9 px-4 py-2 rounded-md">
                        Create Battle
                    </DialogTrigger>
                    <CreateBattleDialog />
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

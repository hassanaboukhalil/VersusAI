'use client';

import { PanelLeft, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { isLoggedIn, getUser } from '../../lib/auth';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '../ui/dialog';
import CreateBattleDialog from '../global/CreateBattleDialog';

interface HeaderProps {
    onToggleSidebar: () => void;
    className?: string;
}

const Header = ({ className, onToggleSidebar }: HeaderProps) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isUserLoggedIn = isLoggedIn();
            setLoggedIn(isUserLoggedIn);

            if (isUserLoggedIn) {
                const user = getUser();
                setIsPremium(user?.is_premium || false);
            }
        }
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
                isPremium ? (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger className="bg-[#DEFE01] shadow-xs hover:bg-primary/90 text-[#000000] size-fit leading-0 cursor-pointer h-9 px-4 py-2 rounded-md">
                            Create Battle
                        </DialogTrigger>
                        <CreateBattleDialog onSuccess={() => setIsDialogOpen(false)} />
                    </Dialog>
                ) : (
                    <Link href="/pricing">
                        <Button variant="default">
                            <Lock className="w-4 h-4 mr-2" />
                            Create Battle
                        </Button>
                    </Link>
                )
            ) : (
                // <Link href="/login">
                //     <Button variant="default">Login</Button>
                // </Link>
                <Button variant="default" href="/login">
                    Login
                </Button>
            )}
        </div>
    );
};
export default Header;

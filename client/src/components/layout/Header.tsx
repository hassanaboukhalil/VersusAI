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
import { Input } from '../ui/input';

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
                    <DialogContent className="bg-[#121212] text-white max-w-2xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-white text-xl text-center">
                                Create a New AI Battle
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-center">
                                “Set up a head-to-head challenge between AIs”
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="text-lg block">Title</label>
                                <Input
                                    type="text"
                                    placeholder="Summarize a text about creating LLM"
                                    className="mt-1"
                                />
                            </div>

                            {/* Battle Type Buttons */}
                            <div>
                                <label className="text-lg mb-1 block">
                                    Choose the battle title
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Text Summarization',
                                        'Debate',
                                        'Code Generation',
                                        'Text Translation',
                                        'Managing CSV',
                                        'General',
                                    ].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className="text-sm border border-[#DEFE01] text-primary rounded px-3 py-1 hover:bg-primary hover:text-black transition"
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Choose AIs */}
                            <div>
                                <label className="text-lg mb-1 block">Choose AIs</label>
                                <div className="flex gap-2">
                                    <select className="flex-1 rounded bg-white text-black px-2 py-1">
                                        <option>Select AI Model A</option>
                                    </select>
                                    <select className="flex-1 rounded bg-white text-black px-2 py-1">
                                        <option>Select AI Model B</option>
                                    </select>
                                </div>
                            </div>

                            {/* Textarea Prompt */}
                            <div>
                                <label className="text-lg mb-1 block">Text to Summarize</label>
                                <textarea
                                    rows={6}
                                    className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                                    placeholder="Enter a paragraph to summarize, translate, or debate..."
                                ></textarea>
                            </div>

                            {/* Public toggle */}
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" className="accent-[#DEFE01]" />
                                public battle
                            </label>

                            {/* Start Battle Button */}
                            <button
                                type="button"
                                className="w-full bg-[#DEFE01] text-black font-medium py-2 rounded hover:opacity-90 transition"
                            >
                                Start Battle
                            </button>
                        </div>
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

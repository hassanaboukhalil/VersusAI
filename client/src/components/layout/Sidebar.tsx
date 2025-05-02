'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import Logo from './Logo';
import { AUTH_NAV_ITEMS, PUBLIC_NAV_ITEMS } from '../../constants/navigation';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const isLoggedIn = false;

const navItems = isLoggedIn ? AUTH_NAV_ITEMS : PUBLIC_NAV_ITEMS;

export default function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                    aria-label="Sidebar Overlay"
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-black text-white shadow-lg transform transition-transform duration-300 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
                    <Logo withTitle />
                    <button onClick={onClose} aria-label="Close sidebar">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col px-4 py-6 gap-3">
                    {navItems.map(({ label, href, icon: Icon }) => (
                        <Link href={href} key={label} className="flex items-center gap-3 px-3 py-2">
                            {Icon && <Icon className="w-5 h-5" />}
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}

'use client';

import '../../styles/globals.css';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { useState } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Header className="my-container" onToggleSidebar={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main>{children}</main>
            <Footer />
        </>
    );
}

'use client';

import Image from 'next/image';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { useState } from 'react';
import Section from '../components/layout/Section';

const NotFound = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            {/* Header */}
            <Header className="my-container" onToggleSidebar={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Section className="min-h-screen flex flex-col bg-background text-white">
                {/* Main Content */}
                <div className="flex flex-1 items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <Image
                            src="/images/404-robot.svg"
                            alt="404 Error"
                            width={300}
                            height={300}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </Section>
            {/* Footer */}
            <Footer />
        </>
    );
};
export default NotFound;

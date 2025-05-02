'use client';

import Header from '../../..//components/layout/Header';
import Section from '../../../components/layout/Section';
import { Button } from '../../..//components/ui/button';
import { Spotlight } from '../../..//components/ui/Spotlight';
import { cn } from '../../..//lib/utils';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Sidebar from '../../layout/Sidebar';

const Hero = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Section
            className="relative flex flex-col w-full overflow-hidden rounded-md bg-background antialiased"
            id="hero"
        >
            <Header onToggleSidebar={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div
                className={cn(
                    'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none'
                    // '[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]'
                )}
            />

            <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
            <div className="flex flex-col flex-center gap-8 relative z-10 mx-auto w-full max-w-7xl py-36 lg:py-40">
                <h1 className="h1 w-full lg:w-[75%] leading-normal bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
                    Create Challenges and Let AIs Compete with{' '}
                    <span className="text-primary">VersusAI</span>
                </h1>
                <p className="body-2 w-full lg:w-[60%] mx-auto mt-4 text-center text-neutral-300">
                    Users can create exciting battles between AI models to solve real tasks, from
                    summarizing text to debating opinions. Compare, vote, and discover which AI
                    performs best.
                </p>
                <Button variant="default">
                    Get Started <ArrowRight />
                </Button>
            </div>
        </Section>
    );
};
export default Hero;

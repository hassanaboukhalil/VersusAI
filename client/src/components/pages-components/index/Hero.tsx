'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import Section from '../../../components/layout/Section';
import { Spotlight } from '../../../components/ui/Spotlight';
import { Button } from '../../../components/ui/button';

const Hero = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Section
            id="hero"
            className="relative isolate flex min-h-screen flex-col bg-background antialiased"
        >
            <Spotlight className="-top-52 left-1/2 -translate-x-1/2 md:-top-40" fill="white" />

            <Header
                onToggleSidebar={() => setSidebarOpen(true)}
                className="absolute top-0 left-0 w-full my-container"
            />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="h1 w-full lg:w-[75%] leading-normal bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl mt-8">
                    Create Challenges and Let AIs Compete with{' '}
                    <span className="text-primary">VersusAI</span>
                </h1>
                <p className="body-2 w-full lg:w-[60%] mx-auto mt-4 text-center text-neutral-300">
                    Users can create exciting battles between AI models to solve real tasks, from
                    summarizing text to debating opinions. Compare, vote, and discover which AI
                    performs best.
                </p>
                <Button variant="default" href="/signup" className="mt-4">
                    Get Started <ArrowRight />
                </Button>
            </div>
        </Section>
    );
};

export default Hero;

'use client';
import Section from '../../../components/layout/Section';
import BattleCards from '../../../components/pages-components/explore/BattleCards';
import { Input } from '../../../components/ui/input';

const page = () => {
    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Explore</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
                <Input type="text" name="search" placeholder="search" className="w-[25rem]" />
                <select className="bg-white rounded-md px-4 py-2 text-black">
                    <option>Battle Type</option>
                    <option>Code Generation</option>
                    <option>Text Summarization</option>
                    <option>Text Translation</option>
                    <option>Debate Challenge</option>
                </select>
                <select className="bg-white rounded-md px-4 py-2 text-black">
                    <option>Date</option>
                    <option>Today</option>
                    <option>This week</option>
                    <option>This month</option>
                </select>
                <select className="bg-white rounded-md px-4 py-2 text-black">
                    <option>AI Name Model</option>
                    <option>GPT-4</option>
                    <option>Claude 3</option>
                    <option>Gemini</option>
                </select>
            </div>

            {/* Cards Grid */}
            <BattleCards />
        </Section>
    );
};
export default page;

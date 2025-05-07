'use client';
import Section from '../../../components/layout/Section';
import BattleCards from '../../../components/pages-components/explore/BattleCards';

const page = () => {
    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Explore</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-md px-4 py-2 text-black"
                />
                <select className="rounded-md px-4 py-2 text-black">
                    <option>Battle Type</option>
                </select>
                <select className="rounded-md px-4 py-2 text-black">
                    <option>Date</option>
                </select>
                <select className="rounded-md px-4 py-2 text-black">
                    <option>AI Name</option>
                </select>
                <select className="rounded-md px-4 py-2 text-black">
                    <option>Sort By</option>
                </select>
            </div>

            {/* Cards Grid */}
            <BattleCards />
        </Section>
    );
};
export default page;

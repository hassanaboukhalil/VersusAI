import Section from '../../../components/layout/Section';
import BattleCard from '../../../components/pages-components/explore/BattleCard';

export const mockBattles = [
    {
        id: '1',
        title: 'Onsite Or Remote Work',
        models: ['ChatGPT', 'Gemini'],
        votes: { ChatGPT: 155, Gemini: 122 },
        type: 'Debate',
        date: '12/3/2025',
        user: { name: 'John Doe', avatar: '/images/user.png' },
    },
    {
        id: '2',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '3',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '4',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '5',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '6',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '7',
        title: 'Onsite Or Remote Work',
        models: ['ChatGPT', 'Gemini'],
        votes: { ChatGPT: 155, Gemini: 122 },
        type: 'Debate',
        date: '12/3/2025',
        user: { name: 'John Doe', avatar: '/images/user.png' },
    },
    {
        id: '8',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '9',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '10',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '11',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
    {
        id: '12',
        title: 'AI for Healthcare',
        models: ['Claude', 'Mistral'],
        votes: { Claude: 98, Mistral: 104 },
        type: 'Summarization',
        date: '10/30/2025',
        user: { name: 'Alice Smith', avatar: '/images/user.png' },
    },
];

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBattles.map((battle) => (
                    <BattleCard key={battle.id} battle={battle} />
                ))}
            </div>
        </Section>
    );
};
export default page;

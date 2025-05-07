'use client';
import { useEffect } from 'react';
import Section from '../../../components/layout/Section';
import BattleCard from '../../../components/pages-components/explore/BattleCard';
import api from '../../../lib/axios';

interface ApiBattle {
    id: number;
    title: string;
    ai_model_1_name: string;
    ai_model_2_name: string;
    votes_ai_model_1: number;
    votes_ai_model_2: number;
    user_first_name: string;
    user_last_name: string;
    user_profile_pic_url: string;
    created_at: string;
}

const page = () => {
    const [battles, setBattles] = useState<ApiBattle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBattles() {
            try {
                const res = await api.get<{
                    success: boolean;
                    message: string;
                    data: ApiBattle[];
                }>('/battles');
                if (res.data.success) {
                    setBattles(res.data.data);
                } else {
                    console.error('API error:', res.data.message);
                }
            } catch (err) {
                console.error('Fetch battles failed', err);
            } finally {
                setLoading(false);
            }
        }
        fetchBattles();
    }, []);

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
                {/* {mockBattles.map((battle) => (
                    <BattleCard key={battle.id} battle={battle} />
                ))} */}
            </div>
        </Section>
    );
};
export default page;

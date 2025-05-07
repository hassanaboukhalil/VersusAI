'use client';

import { useEffect, useState } from 'react';
import BattleCard from './BattleCard';
import api from '../../../lib/axios';

interface ApiBattle {
    id: number;
    title: string;
    type: string;
    ai_model_1_name: string;
    ai_model_2_name: string;
    votes_ai_model_1: number;
    votes_ai_model_2: number;
    user_first_name: string;
    user_last_name: string;
    user_profile_pic_url: string;
    created_at: string;
}

const BattleCards = () => {
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

    if (loading) {
        return (
            <div className="bg-background min-h-screen py-12">
                <p className="text-center text-gray-400">Loading battles…</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {battles.map((b) => (
                <BattleCard
                    key={b.id}
                    battle={{
                        id: b.id.toString(),
                        title: b.title,
                        models: [b.ai_model_1_name, b.ai_model_2_name],
                        votes: {
                            [b.ai_model_1_name]: b.votes_ai_model_1,
                            [b.ai_model_2_name]: b.votes_ai_model_2,
                        },
                        type: b.type,
                        date: b.created_at,
                        user: {
                            name: `${b.user_first_name} ${b.user_last_name}`,
                            avatar: b.user_profile_pic_url,
                        },
                    }}
                />
            ))}
        </div>
    );
};
export default BattleCards;

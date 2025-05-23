import api from '../../lib/axios';
import { getUser } from '../../lib/auth';

export const voteForAiModel = async (battleId: string, aiModelName: string) => {
    try {
        const user = getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const response = await api.post(`/battles/vote`, {
            battle_id: battleId,
            ai_model: aiModelName,
            user_id: user.id,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const unvoteFromBattle = async (battleId: string) => {
    try {
        const user = getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const response = await api.post(`/battles/unvote`, {
            battle_id: battleId,
            user_id: user.id,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

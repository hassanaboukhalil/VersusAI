import api from '../../lib/axios';
import { getUser } from '../../lib/auth';

export const voteForAiModel = async (battleId: string, aiModelName: string) => {
    try {
        const user = getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const response = await api.post(`/v1/battles/${battleId}/vote`, {
            ai_model: aiModelName,
            user_id: user.id,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

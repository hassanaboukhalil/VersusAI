import api from '../../lib/axios';

export const voteForAiModel = async (battleId: string, aiModelId: number) => {
    try {
        const response = await api.post(`/v1/battles/${battleId}/vote`, {
            ai_model_id: aiModelId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

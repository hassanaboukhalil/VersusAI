import api from '../../lib/axios';

export interface CreateBattleParams {
    title: string;
    description: string;
    battle_type_name: string;
    ai_model_1_name: string;
    ai_model_2_name: string;
    temperature: number;
    target_language?: string;
    programming_language?: string;
    debate_title_1?: string;
    debate_title_2?: string;
}

export const createBattle = async (params: CreateBattleParams) => {
    const response = await api.post('/premium/create-battle', params);
    return response.data;
};

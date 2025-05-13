import { Round } from '../redux/slices/battleSlice';

export interface Battle {
    id: number;
    title: string;
    type: string;
    description?: string;
    target_language?: string;
    programming_language?: string;
    ai_model_1_id: number;
    ai_model_2_id: number;
    ai_model_1_name: string;
    ai_model_2_name: string;
    votes_ai_model_1: number;
    votes_ai_model_2: number;
    user_first_name: string;
    user_last_name: string;
    user_profile_pic_url: string;
    created_at: string;
    is_active?: boolean;
    rounds?: Round[];
}

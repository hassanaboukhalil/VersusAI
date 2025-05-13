// Response from AI models in a battle round
export interface Response {
    ai_model_name: string;
    response_text: string;
}

// A round in a battle containing responses from both AIs
export interface Round {
    id: number;
    responses: Response[];
}

// User information
export interface User {
    first_name: string;
    username: string;
    profile_picture_url: string | null;
}

// AI model in a battle with its vote count
export interface AiModel {
    name: string;
    votes: number;
}

// Main battle interface
export interface Battle {
    id: number;
    title: string;
    description: string;
    type: string;
    target_language?: string;
    programming_language?: string;
    debate_title_1?: string;
    debate_title_2?: string;
    is_active: boolean;
    ai_models: AiModel[];
    user: User;
    rounds: Round[];
    // Fields for battle card display
    ai_model_1_id?: number;
    ai_model_2_id?: number;
    ai_model_1_name?: string;
    ai_model_2_name?: string;
    votes_ai_model_1?: number;
    votes_ai_model_2?: number;
    user_first_name?: string;
    user_last_name?: string;
    user_profile_pic_url?: string;
    created_at?: string;
}

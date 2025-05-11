import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Response {
    ai_model_name: string;
    response_text: string;
}

export interface Round {
    id: number;
    responses: Response[];
}

export interface User {
    user_first_name: string;
    user_username: string;
    user_profile_pic_url: string | null;
}

export interface AiModel {
    name: string;
    votes: number;
}

export interface Battle {
    id: number;
    title: string;
    description: string;
    type: string;
    is_active: boolean;
    ai_models: AiModel[];
    user: User;
    rounds: Round[];
}

interface BattleState {
    currentBattle: Battle | null;
}

const initialState: BattleState = {
    currentBattle: null,
};

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        setCurrentBattle(state, action: PayloadAction<Battle>) {
            state.currentBattle = action.payload;
        },
        clearCurrentBattle(state) {
            state.currentBattle = null;
        },
        addRound(state, action: PayloadAction<Round>) {
            if (state.currentBattle) {
                state.currentBattle.rounds.push(action.payload);
            }
        },
    },
});

export const { setCurrentBattle, clearCurrentBattle, addRound } = battleSlice.actions;
export default battleSlice.reducer;

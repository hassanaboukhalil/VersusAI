// redux/slices/battleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Battle {
    id: number;
    title: string;
    description: string;
    type: string;
    ai_models: { name: string; votes: number }[];
    rounds: Round[];
}

export interface Round {
    id: number;
    responses: Response[];
}

export interface Response {
    ai_model_name: string;
    response_text: string;
    votes: number;
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
    },
});

export const { setCurrentBattle, clearCurrentBattle } = battleSlice.actions;
export default battleSlice.reducer;

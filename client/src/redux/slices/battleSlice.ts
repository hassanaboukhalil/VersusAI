import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Battle, Round } from '../../types/battle';

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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Battle } from '../../types/battle';

interface ExploreState {
    battles: Battle[];
    loading: boolean;
    sortBy: string;
    filters: {
        search: string;
        battleType: string;
        dateRange: string;
        aiName: string;
    };
}

const initialState: ExploreState = {
    battles: [],
    loading: false,
    sortBy: 'Most Recent',
    filters: {
        search: '',
        battleType: '',
        dateRange: '',
        aiName: '',
    },
};

const exploreSlice = createSlice({
    name: 'explore',
    initialState,
    reducers: {
        fetchBattlesStart(state) {
            state.loading = true;
        },
        fetchBattlesSuccess(state, action: PayloadAction<Battle[]>) {
            state.battles = action.payload;
            state.loading = false;
        },
        fetchBattlesFailure(state) {
            state.loading = false;
        },
        setFilter(
            state,
            action: PayloadAction<{ key: keyof ExploreState['filters']; value: string }>
        ) {
            state.filters[action.payload.key] = action.payload.value;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        resetFilters(state) {
            state.filters = initialState.filters;
        },
    },
});

export const {
    fetchBattlesStart,
    fetchBattlesSuccess,
    fetchBattlesFailure,
    setFilter,
    resetFilters,
    setSortBy,
} = exploreSlice.actions;
export default exploreSlice.reducer;

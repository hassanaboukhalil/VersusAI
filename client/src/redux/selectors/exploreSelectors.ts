import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectBattles = (state: RootState) => state.explore.battles;
export const selectFilters = (state: RootState) => state.explore.filters;

export const selectFilteredBattles = createSelector(
    [selectBattles, selectFilters],
    (battles, filters) => {
        return battles.filter((b) => {
            if (filters.search && !b.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            if (filters.battleType && b.type !== filters.battleType) {
                return false;
            }
            if (
                filters.aiName &&
                ![b.ai_model_1_name, b.ai_model_2_name].includes(filters.aiName)
            ) {
                return false;
            }
            if (filters.battleType && filters.battleType !== '' && b.type !== filters.battleType) {
                return false;
            }
            if (
                filters.aiName &&
                filters.aiName !== '' &&
                ![b.ai_model_1_name, b.ai_model_2_name].includes(filters.aiName)
            ) {
                return false;
            }
            return true;
        });
    }
);

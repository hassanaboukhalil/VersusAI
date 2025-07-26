import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectBattles = (state: RootState) => state.explore.battles;
export const selectFilters = (state: RootState) => state.explore.filters;

export const selectFilteredBattles = createSelector(
    [selectBattles, selectFilters],
    (battles, filters) => {
        // Ensure battles is an array
        if (!Array.isArray(battles)) {
            return [];
        }
        return battles.filter((b) => {
            // filter by battle one by one

            // check if the title the battle includes the search term
            if (filters.search && !b.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // check if the battle type is the same as the filter
            if (filters.battleType && filters.battleType !== '' && b.type !== filters.battleType) {
                return false;
            }

            // check if the ai model is the same as the filter
            if (filters.aiName && filters.aiName !== '') {
                const aiModelId = parseInt(filters.aiName);
                if (b.ai_model_1_id !== aiModelId && b.ai_model_2_id !== aiModelId) {
                    return false;
                }
            }

            return true;
        });
    }
);

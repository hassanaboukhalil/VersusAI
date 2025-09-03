import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectBattles = (state: RootState) => state.explore.battles;
export const selectFilters = (state: RootState) => state.explore.filters;
export const selectSortBy = (state: RootState) => state.explore.sortBy;

export const selectFilteredBattles = createSelector(
    [selectBattles, selectFilters, selectSortBy],
    (battles, filters, sortBy) => {
        // Ensure battles is an array
        if (!Array.isArray(battles)) {
            return [];
        }

        // STEP 1: Filter battles first
        let filteredBattles = battles.filter((b) => {
            // filter by battle one by one

            // check if the title the battle includes the search term
            if (filters.search && !b.title.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // check if the battle type is the same as the filter
            if (filters.battleType && filters.battleType !== '' && b.type !== filters.battleType) {
                return false;
            }

            // Fix AI model filtering - compare ID to ID, not ID to name
            if (filters.aiName && filters.aiName !== '') {
                const aiModelId = parseInt(filters.aiName); // Convert string ID to number
                if (b.ai_model_1_id !== aiModelId && b.ai_model_2_id !== aiModelId) {
                    return false;
                }
            }

            return true;
        });

        // STEP 2: Sort the filtered battles
        switch (sortBy.toLowerCase()) {
            case 'most recent':
                filteredBattles = filteredBattles.sort((a, b) => {
                    // Sort by created_at date (newest first)
                    const dateA = new Date(a.created_at || '').getTime();
                    const dateB = new Date(b.created_at || '').getTime();
                    return dateB - dateA; // Newest first
                });
                break;

            case 'most popular':
                filteredBattles = filteredBattles.sort((a, b) => {
                    // Calculate total votes for each battle
                    const votesA = (a.votes_ai_model_1 || 0) + (a.votes_ai_model_2 || 0);
                    const votesB = (b.votes_ai_model_1 || 0) + (b.votes_ai_model_2 || 0);
                    return votesB - votesA; // Most votes first
                });
                break;

            default:
                // Default to most recent if sortBy is not recognized
                filteredBattles = filteredBattles.sort((a, b) => {
                    const dateA = new Date(a.created_at || '').getTime();
                    const dateB = new Date(b.created_at || '').getTime();
                    return dateB - dateA;
                });
        }

        return filteredBattles;
    }
);

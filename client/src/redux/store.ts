import { configureStore } from '@reduxjs/toolkit';
import exploreReducer from './slices/exploreSlice';
import battleReducer from './slices/battleSlice';

export const store = configureStore({
    reducer: {
        explore: exploreReducer,
        battle: battleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

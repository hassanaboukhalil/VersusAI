import { configureStore } from '@reduxjs/toolkit';
import exploreReducer from './slices/exploreSlice';
import battleReducer from './slices/battleSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        explore: exploreReducer,
        battle: battleReducer,
        notification: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

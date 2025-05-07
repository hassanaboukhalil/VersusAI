// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import exploreReducer from './slices/exploreSlice';

export const store = configureStore({
    reducer: {
        explore: exploreReducer,
    },
});

// Types for dispatch and selector hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks to use across the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from '@reduxjs/toolkit';
import allocationReducer from './slices/allocationSlice';

export const store = configureStore({
  reducer: {
    allocation: allocationReducer,
  },
});

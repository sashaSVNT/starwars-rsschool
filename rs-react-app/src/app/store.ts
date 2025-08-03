import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from '../features/selectedItemReducer';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

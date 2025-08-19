import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from '../features/selectedItemSlice/selectedItemSlice';
import { api } from '../features/api/api';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemReducer,
    api: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

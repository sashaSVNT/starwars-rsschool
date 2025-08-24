import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../features/formDataSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

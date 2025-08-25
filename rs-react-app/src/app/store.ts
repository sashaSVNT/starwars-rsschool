import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../features/formDataSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

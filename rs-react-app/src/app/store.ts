import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/formSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

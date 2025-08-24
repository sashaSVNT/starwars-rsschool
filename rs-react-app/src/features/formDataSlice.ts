import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDataState } from '../types/formDataState';

const initialState: FormDataState[] = [];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataState>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;

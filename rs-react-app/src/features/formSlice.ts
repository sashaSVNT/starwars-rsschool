import type { FormData } from '../types/formData.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { COUNTRIES } from '../constants';

type FormDataType = {
  formData: FormData[];
  countries: string[];
};

const initialState: FormDataType = {
  formData: [],
  countries: COUNTRIES,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.formData.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;

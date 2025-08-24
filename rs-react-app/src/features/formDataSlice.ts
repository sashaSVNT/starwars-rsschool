import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDataState } from '../types/formDataState';

const initialState: FormDataState = {
  isDataSet: false,
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (_state, action: PayloadAction<FormDataState>) => {
      return action.payload;
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;

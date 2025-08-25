import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'uncontrolledForm' | 'reactHookForm' | 'none';

type ModalStateType = {
  activeModal: ModalType;
};

const initialState: ModalStateType = {
  activeModal: 'none',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = 'none';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

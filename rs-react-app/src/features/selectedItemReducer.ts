import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SelectedItemsState = {
  selectedIds: string[];
};

const initialState: SelectedItemsState = {
  selectedIds: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state: SelectedItemsState, action: PayloadAction<string>) => {
      const selectedItemId = action.payload;
      const index = state.selectedIds.indexOf(selectedItemId);

      if (index !== -1) {
        state.selectedIds.splice(index, 1);
      } else {
        state.selectedIds.push(selectedItemId);
      }
    },
    unselectAllItems: (state: SelectedItemsState) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleItem, unselectAllItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;

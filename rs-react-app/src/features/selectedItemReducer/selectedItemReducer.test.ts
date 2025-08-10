import { expect } from 'vitest';
import selectedItemsReducer, {
  toggleItem,
  unselectAllItems,
  type SelectedItemsState,
} from './selectedItemReducer';

describe('Test SelectedItemsSlice', () => {
  const initialState: SelectedItemsState = {
    selectedIds: [],
  };

  test('should add new id', () => {
    const state = selectedItemsReducer(initialState, toggleItem('1'));
    expect(state.selectedIds).toEqual(['1']);
  });

  test('should remove existing id', () => {
    const state: SelectedItemsState = {
      selectedIds: ['1', '2'],
    };

    const result = selectedItemsReducer(state, toggleItem('2'));
    expect(result.selectedIds).toEqual(['1']);
  });

  test('should remove all existing ids', () => {
    const state: SelectedItemsState = {
      selectedIds: ['1', '2', '999', '123'],
    };

    const result = selectedItemsReducer(state, unselectAllItems());
    expect(result.selectedIds).toEqual([]);
  });
});

import { expect } from 'vitest';
import { store } from './store';
import {
  toggleItem,
  unselectAllItems,
} from '../features/selectedItemSlice/selectedItemSlice';

describe('Test Redux Store Configuration', () => {
  test('Toggle Items Correctly', () => {
    store.dispatch(toggleItem('1'));
    store.dispatch(toggleItem('2'));
    store.dispatch(toggleItem('1'));

    const state = store.getState();
    expect(state.selectedItems.selectedIds).toEqual(['2']);
  });

  test('Unselect All Items Correctly', () => {
    store.dispatch(toggleItem('1'));
    store.dispatch(toggleItem('2'));
    store.dispatch(toggleItem('3'));
    store.dispatch(unselectAllItems());
    const state = store.getState();
    expect(state.selectedItems.selectedIds.length).toBe(0);
  });
});

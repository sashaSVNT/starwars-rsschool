import { render, screen } from '@testing-library/react';
import SelectedItemsCounter from './SelectedItemsCounter';

const mockProps = {
  quantity: 1,
  unselectAll: vi.fn(),
};

describe('SelectedItemsCounter Component Test', () => {
  test('Success component render', () => {
    render(<SelectedItemsCounter {...mockProps} />);
    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
  });
});

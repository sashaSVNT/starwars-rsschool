import type { ReactNode } from 'react';
import Modal from './Modal';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: ReactNode) => children,
  };
});

describe('Modal window tests', () => {
  const mockOnClose = vi.fn();
  const mockContainer = 'Test text';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = () =>
    render(
      <Provider store={store}>
        <Modal onClose={mockOnClose}>
          <div>{mockContainer}</div>
        </Modal>
      </Provider>
    );

  test('Renders modal with child component successfully', () => {
    renderWithProvider();

    expect(screen.getByText(mockContainer)).toBeInTheDocument();
  });

  test('Modal close on escape key press', async () => {
    renderWithProvider();

    await userEvent.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Modal close on overlay click', async () => {
    renderWithProvider();

    const overlay = screen.getByTestId('overlay');
    await userEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

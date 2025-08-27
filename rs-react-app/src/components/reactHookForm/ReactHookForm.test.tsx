import { Provider } from 'react-redux';
import ReactHookForm from './ReactHookForm';
import { render, screen } from '@testing-library/react';
import { store } from '../../app/store';
import userEvent from '@testing-library/user-event';

describe('Uncontrolled Form tests', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  const renderWithProvider = () =>
    render(
      <Provider store={store}>
        <ReactHookForm onClose={mockOnClose} />
      </Provider>
    );

  test('Show validation errors for empty fields', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('Submit'));
    const nameInput = screen.getByLabelText('Name:');
    await userEvent.type(nameInput, 'invalid');
    await userEvent.tab();

    expect(
      await screen.findByText('First letter must be uppercase')
    ).toBeInTheDocument();
  });
});

import { Provider } from 'react-redux';
import UncontrolledForm from './UncontrolledForm';
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
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

  test('Render input fields on form', () => {
    renderWithProvider();

    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Age:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Load profile picture:')).toBeInTheDocument();
    expect(
      screen.getByLabelText('I accept the Terms and Conditions')
    ).toBeInTheDocument();
  });

  test('Shows all error messages', async () => {
    renderWithProvider();
    const button = screen.getByRole('button', { name: /submit/i });

    await userEvent.click(button);
    expect(
      screen.getByText('First letter must be uppercase')
    ).toBeInTheDocument();
    expect(screen.getByText('Age must be more than 0')).toBeInTheDocument();
    expect(screen.getByText('Email is not valid')).toBeInTheDocument();
    expect(screen.getByText('You must select a country')).toBeInTheDocument();
    expect(screen.getByText(/password must contain/i)).toBeInTheDocument();
    expect(screen.getByText('You must select a gender')).toBeInTheDocument();
    expect(
      screen.getByText('You must accept the terms and conditions')
    ).toBeInTheDocument();
  });
});

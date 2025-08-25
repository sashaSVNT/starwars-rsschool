import { describe, vi } from 'vitest';
import Input from './Input';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';

describe('Input tests', () => {
  const mockProps = {
    id: 'test',
    type: 'text',
    label: 'Test:',
    name: 'test',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (errorMessage?: string) =>
    render(
      <Provider store={store}>
        <Input {...mockProps} errorMessage={errorMessage} />
      </Provider>
    );

  test('Render component correctly', () => {
    renderWithProvider();
    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
  });

  test('Render component with error message', () => {
    const errorMessage = 'Error';
    renderWithProvider(errorMessage);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('Render component without error message', () => {
    renderWithProvider();
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toHaveTextContent('');
  });
});

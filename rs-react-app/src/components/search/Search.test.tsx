import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi, beforeEach } from 'vitest';
import Search from './Search';

describe('Search Component Tests', () => {
  const props = {
    onSearchSubmit: vi.fn(),
    onSearchChange: vi.fn(),
    searchValue: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('Renders search input and search button', () => {
      render(<Search {...props} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });

    // test('Displays previously saved search term from localStorage on mount', () => {});

    // test('Shows empty input when no saved term exists', () => {});
  });

  describe('User Interaction Tests', () => {
    test('Updates input value when user types', () => {
      render(<Search {...props} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'skywalker' } });
      expect(props.onSearchChange).toHaveBeenCalledWith('skywalker');
    });

    test('Triggers search callback with correct parameters', () => {
      render(<Search {...props} />);
      fireEvent.submit(screen.getByRole('form', { name: 'Search form' }));
      expect(props.onSearchSubmit).toHaveBeenCalled();
    });
  });
});

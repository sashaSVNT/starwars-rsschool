import { fireEvent, render, screen } from '@testing-library/react';
import { describe, vi, beforeEach } from 'vitest';
import Search from './Search';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('Search Component Tests', () => {
  const props = {
    onSearchSubmit: vi.fn(),
    onSearchChange: vi.fn(),
    searchValue: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSearch = () => {
    return render(
      <MemoryRouter>
        <ThemeProvider>
          <Search {...props} />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  describe('Rendering Tests', () => {
    test('Renders search input and search button', () => {
      renderSearch();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    test('Updates input value when user types', () => {
      renderSearch();
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'skywalker' } });
      expect(props.onSearchChange).toHaveBeenCalledWith('skywalker');
    });

    test('Triggers search callback with correct parameters', () => {
      renderSearch();
      fireEvent.submit(screen.getByRole('form', { name: 'Search form' }));
      expect(props.onSearchSubmit).toHaveBeenCalled();
    });

    test('Changes theme when theme button is clicked', () => {
      renderSearch();
      const themeButton = screen.getByRole('button', { name: 'light' });
      fireEvent.click(themeButton);
      expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument();
    });
  });
});

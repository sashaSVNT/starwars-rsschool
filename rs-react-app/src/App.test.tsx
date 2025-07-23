import { describe, test, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { swapiService } from './services/swapiService';
import type { PersonResult } from './types/personResult.type';

vi.mock('./services/swapiService', () => {
  return {
    swapiService: {
      getAllPeople: vi.fn(),
    },
  };
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key]),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Component Tests', () => {
  const mockPeople: PersonResult[] = [
    {
      description: 'Person',
      properties: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        hair_color: 'brown',
        gender: 'male',
        height: '172',
      },
      uid: '1',
      _id: '1',
    },
    {
      description: 'Person',
      properties: {
        name: 'Leia Organa',
        birth_year: '19BBY',
        eye_color: 'brown',
        hair_color: 'brown',
        gender: 'female',
        height: '150',
      },
      uid: '2',
      _id: '1',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    (swapiService.getAllPeople as Mock).mockResolvedValue([]);
  });

  test('Makes initial API call on component mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith('');
    });
  });

  test('Handles search term from localStorage on initial load', async () => {
    window.localStorage.setItem('searchValue', 'skywalker');

    render(<App />);

    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith('skywalker');
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('skywalker');
    });
  });

  test('Calls API with correct parameters', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'luke' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith('luke');
    });
  });

  test('Handles successful API responses', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue(mockPeople);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });
  });

  test('Updates component state based on API responses', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue(mockPeople);
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  test('Manages search term state correctly', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'searchValue',
        'test'
      );
    });
  });

  test('Trims whitespace before saving and searching', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  test value  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith('test value');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'searchValue',
        'test value'
      );
      expect(input).toHaveValue('test value');
    });
  });
});

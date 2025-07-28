import { describe, test, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PeoplePage from './PeoplePage';
import { swapiService } from '../../services/swapiService';
import type { PersonResult } from '../../types/personResult.type';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../services/swapiService', () => {
  return {
    swapiService: {
      getAllPeople: vi.fn(),
      getPeopleByQuery: vi.fn(),
      getPersonById: vi.fn(),
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

describe('PeoplePage Component Tests', () => {
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
        skin_color: 'brown',
        mass: '66',
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
        skin_color: 'white',
        mass: '77',
      },
      uid: '2',
      _id: '2',
    },
  ];

  const mockPersonDetails = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    eye_color: 'blue',
    hair_color: 'brown',
    gender: 'male',
    height: '172',
    skin_color: 'brown',
    mass: '66',
  };

  const renderWithRouter = (initialPage = ['/1']) => {
    return render(
      <MemoryRouter initialEntries={initialPage}>
        <Routes>
          <Route path="/" element={<PeoplePage />} />
          <Route path="/:page" element={<PeoplePage />} />
          <Route path="/:page/:detailsId" element={<PeoplePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: [],
      total_pages: 1,
    });
    (swapiService.getPeopleByQuery as Mock).mockResolvedValue({
      result: [],
    });
    (swapiService.getPersonById as Mock).mockResolvedValue(mockPersonDetails);
  });

  test('renders PeoplePage without crashing', () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });
    renderWithRouter();
  });

  test('Makes initial API call on component mount', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });
    renderWithRouter();

    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith(1);
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  test('Handles search term from localStorage on initial load', async () => {
    localStorageMock.getItem.mockReturnValue('skywalker');
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByDisplayValue('skywalker')).toBeInTheDocument();
    });
  });

  test('Calls API with correct parameters', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });
    renderWithRouter();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'luke' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(swapiService.getPeopleByQuery).toHaveBeenCalledWith('luke');
    });
  });

  test('Handles successful API responses', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  test('Updates component state based on API responses', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });
    renderWithRouter();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  test('Manages search term state correctly', async () => {
    renderWithRouter();
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
    renderWithRouter();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  test value  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(swapiService.getPeopleByQuery).toHaveBeenCalledWith('test value');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'searchValue',
        'test value'
      );
    });
  });

  test('Opens person details correctly', async () => {
    (swapiService.getAllPeople as Mock).mockResolvedValue({
      results: mockPeople,
      total_pages: 1,
    });

    renderWithRouter();

    await waitFor(() => screen.getByText('Luke Skywalker'));
    const card = screen.getByText('Luke Skywalker').closest('div');
    if (card) {
      fireEvent.click(card);
    }
    await waitFor(() => {
      expect(swapiService.getPersonById).toHaveBeenCalledWith('1');
      expect(screen.getByText('male')).toBeInTheDocument();
    });
  });

  test('Handles pagination successfully', async () => {
    (swapiService.getAllPeople as Mock)
      .mockResolvedValueOnce({
        results: [mockPeople[0]],
        total_pages: 2,
      })
      .mockResolvedValueOnce({ results: [mockPeople[1]], total_pages: 2 });

    renderWithRouter();
    await waitFor(() => screen.getByText('Luke Skywalker'));
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(swapiService.getAllPeople).toHaveBeenCalledWith(2);
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });
  });
});

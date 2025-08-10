import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PeoplePage from './PeoplePage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { ThemeProvider } from '../../context/ThemeProvider';
import { api } from '../../features/api/api';

vi.mock('../../features/api/api', async () => {
  const actual = await vi.importActual<typeof import('../../features/api/api')>(
    '../../features/api/api'
  );

  return {
    ...actual,
    useGetPeopleQuery: () => ({
      data: {
        results: [
          {
            uid: '1',
            _id: '1',
            description: 'Person',
            properties: {
              name: 'Luke Skywalker',
              birth_year: '19BBY',
              gender: 'male',
              eye_color: 'blue',
              hair_color: 'brown',
              height: '172',
              skin_color: 'brown',
              mass: '66',
            },
          },
          {
            uid: '2',
            _id: '2',
            description: 'Person',
            properties: {
              name: 'Leia Organa',
              birth_year: '19BBY',
              gender: 'female',
              eye_color: 'brown',
              hair_color: 'brown',
              height: '150',
              skin_color: 'white',
              mass: '77',
            },
          },
        ],
        totalPages: 2,
      },
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    }),
    useGetPersonByIdQuery: () => ({
      data: {
        properties: {
          name: 'Leia Organa',
          birth_year: '19BBY',
          gender: 'female',
          eye_color: 'brown',
          hair_color: 'brown',
          height: '150',
          skin_color: 'white',
          mass: '77',
        },
      },
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    }),
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
  const renderWithRouter = (initialPage = ['/1']) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={initialPage}>
            <Routes>
              <Route path="/" element={<PeoplePage />} />
              <Route path="/:page" element={<PeoplePage />} />
              <Route path="/:page/:detailsId" element={<PeoplePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  test('renders PeoplePage without crashing', () => {
    renderWithRouter();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Handles search term from localStorage on initial load', async () => {
    localStorageMock.getItem.mockReturnValue('skywalker');
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByDisplayValue('skywalker')).toBeInTheDocument();
    });
  });

  test('Calls API with correct parameters', async () => {
    renderWithRouter();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'luke' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'searchValue',
        'luke'
      );
    });
  });

  test('Shown spinner based on API response', async () => {
    vi.mock('../../features/api/api', async () => {
      const actual = await vi.importActual<
        typeof import('../../features/api/api')
      >('../../features/api/api');
      return {
        ...actual,
        useGetPeopleQuery: () => ({
          data: undefined,
          isLoading: true,
          isFetching: true,
          refetch: vi.fn(),
        }),
        useGetPersonByIdQuery: actual.useGetPersonByIdQuery,
      };
    });
    renderWithRouter();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
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
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'searchValue',
        'test value'
      );
    });
  });
});

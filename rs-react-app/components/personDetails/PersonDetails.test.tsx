import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PersonDetails from './PersonDetails';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock('../../features/api/api', () => ({
  useGetPersonByIdQuery: (id: string) => {
    if (id === 'testSpinner') {
      return {
        data: undefined,
        isError: false,
        isFetching: true,
        refetch: vi.fn(),
      };
    }
    if (id === 'testError') {
      return {
        data: undefined,
        isError: true,
        isFetching: false,
        refetch: vi.fn(),
      };
    }
    return {
      data: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        hair_color: 'brown',
        gender: 'male',
        height: '172',
        skin_color: 'brown',
        mass: '66',
      },
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    };
  },
}));

const renderWithProvider = (el: React.ReactElement) => {
  return render(<Provider store={store}>{el}</Provider>);
};

vi.mock('../spinner', () => ({
  default: vi.fn(() => <div data-testid="spinner"></div>),
}));

vi.mock('../../utils/formatPersonAttribute', () => ({
  default: vi.fn().mockImplementation((key) => `test ${key}`),
}));

describe('PersonDetails component tests', () => {
  const onCloseDetailsMock = vi.fn();
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Dispay spinner after component is mount', () => {
    renderWithProvider(
      <PersonDetails id="testSpinner" onCloseDetails={onCloseDetailsMock} />
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('Trigger close button', async () => {
    renderWithProvider(
      <PersonDetails id="1" onCloseDetails={onCloseDetailsMock} />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: '×' }));
      expect(onCloseDetailsMock).toHaveBeenCalledOnce();
    });
  });

  test('When error occurs component didnt renders', async () => {
    renderWithProvider(
      <PersonDetails id="testError" onCloseDetails={onCloseDetailsMock} />
    );
    await waitFor(() => {
      expect(screen.queryByTestId('personDetails')).not.toBeInTheDocument();
    });
  });
});

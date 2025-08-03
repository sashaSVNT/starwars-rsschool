import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { swapiService } from '../../services/swapiService';
import PersonDetails from './PersonDetails';
import type { Mock } from 'vitest';

vi.mock('../../services/swapiService', () => ({
  swapiService: {
    getPersonById: vi.fn(),
  },
}));

vi.mock('../spinner', () => ({
  default: vi.fn(() => <div data-testid="spinner"></div>),
}));

vi.mock('../../utils/formatPersonAttribute', () => ({
  default: vi.fn().mockImplementation((key) => `test ${key}`),
}));

describe('PersonDetails component tests', () => {
  const onCloseDetailsMock = vi.fn();
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Dispay spinner after component is mount', () => {
    (swapiService.getPersonById as Mock).mockImplementation(
      () => new Promise(() => {})
    );
    render(<PersonDetails id="1" onCloseDetails={onCloseDetailsMock} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('Trigger close button', async () => {
    (swapiService.getPersonById as Mock).mockResolvedValue({
      result: { properties: mockPersonDetails },
    });
    render(<PersonDetails id="1" onCloseDetails={onCloseDetailsMock} />);

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: '×' }));
      expect(onCloseDetailsMock).toHaveBeenCalledOnce();
    });
  });

  test('When error occurs component didnt renders', async () => {
    (swapiService.getPersonById as Mock).mockRejectedValue(
      new Error('Error while fetching')
    );
    render(<PersonDetails id="1" onCloseDetails={onCloseDetailsMock} />);
    await waitFor(() => {
      expect(screen.queryByTestId('personDetails')).not.toBeInTheDocument();
    });
  });
});

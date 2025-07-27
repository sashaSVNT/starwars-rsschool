import { render, screen } from '@testing-library/react';
import type { PersonResult } from '../../types/personResult.type';
import CardsList from './CardsList';

vi.mock('../card/Card', () => ({
  default: vi.fn(({ name, birthYear }) => (
    <div data-testid="mock-card">
      <h2>{name}</h2>
      <div>{birthYear}</div>
    </div>
  )),
}));

describe('CardList Component Tests', () => {
  const mockData: PersonResult[] = [
    {
      description: 'Main character',
      properties: {
        name: 'Test Skywalker',
        birth_year: '30BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '188',
        skin_color: 'fair',
        mass: '77',
      },
      uid: '12',
      _id: '12',
    },
    {
      description: 'Main character',
      properties: {
        name: 'Test Organa',
        birth_year: '29BBY',
        eye_color: 'brown',
        gender: 'female',
        hair_color: 'brown',
        height: '150',
        skin_color: 'fair',
        mass: '77',
      },
      uid: '99',
      _id: '99',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('Renders correct number of items when data is provided', () => {
      render(<CardsList data={mockData} isLoading={false} />);
      const cards = screen.queryAllByTestId('mock-card');
      expect(cards.length).toBe(mockData.length);
    });

    test('Displays "no results" message when data array is empty', () => {
      render(<CardsList data={[]} isLoading={false} />);
      expect(screen.getByText('no results')).toBeInTheDocument();
    });

    test('Shows isLoading state while fetching data', () => {
      render(<CardsList data={[]} isLoading={true} />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    test('Correctly displays item names and descriptions', () => {
      render(<CardsList data={mockData} isLoading={false} />);
      expect(screen.getByText('Test Skywalker')).toBeInTheDocument();
      expect(screen.getByText('30BBY')).toBeInTheDocument();
      expect(screen.getByText('Test Organa')).toBeInTheDocument();
      expect(screen.getByText('29BBY')).toBeInTheDocument();
    });
  });
});

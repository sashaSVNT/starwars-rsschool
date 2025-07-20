import { render, screen } from '@testing-library/react';
import type { PersonResult } from '../../types/personResult.type';
import CardsList from './CardsList';

vi.mock('../card/Card', () => ({
  default: vi.fn().mockImplementation((props) => (
    <div data-testid="card">
      {Object.values(props).map((el, i) => (
        <div key={i}>{String(el)}</div>
      ))}
    </div>
  )),
}));

describe('CardsList tests', () => {
  const data: PersonResult[] = [
    {
      description: 'Main character',
      properties: {
        name: 'Test Skywalker',
        birth_year: '30BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '188',
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
      },
      uid: '99',
      _id: '99',
    },
  ];

  test('display all cards', () => {
    render(<CardsList data={data} />);
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(data.length);
  });

  test('no results', () => {
    render(<CardsList data={[]} />);
    expect(screen.getByText('no results')).toBeInTheDocument();
  });
});

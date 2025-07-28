import { render, screen } from '@testing-library/react';
import Card from './Card';
import { vi } from 'vitest';
import formatPersonAttribute from '../../utils/formatPersonAttribute';
import styles from './Card.module.css';

vi.mock('../../utils/formatPersonAttribute', () => ({
  default: vi.fn().mockImplementation((key) => `test ${key}`),
}));

describe('Card tests', () => {
  const props = {
    name: 'Test Skywalker',
    birth_year: '29BBY',
    eye_color: 'green',
    gender: 'male',
    height: '190',
    id: '1',
    onSelectPerson: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Displays name correctly', () => {
    render(<Card {...props} />);
    expect(screen.getByText('Test Skywalker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass(styles.name);
  });

  test('Displays attributes correctly', () => {
    render(<Card {...props} />);
    expect(screen.getByText('29BBY')).toBeInTheDocument();
    expect(screen.getByText('green')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('190')).toBeInTheDocument();
  });

  test('formatPersonAttribute mock tests', () => {
    render(<Card {...props} />);
    expect(formatPersonAttribute).toHaveBeenCalledWith('birth_year');
    expect(formatPersonAttribute).toHaveBeenCalledWith('eye_color');
    expect(formatPersonAttribute).toHaveBeenCalledWith('gender');
    expect(formatPersonAttribute).toHaveBeenCalledWith('height');
    expect(formatPersonAttribute).toHaveBeenCalledTimes(4);
  });
});

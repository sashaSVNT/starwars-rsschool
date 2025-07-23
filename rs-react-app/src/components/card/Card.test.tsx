import { render, screen } from '@testing-library/react';
import Card from './Card';
import { vi } from 'vitest';
import formatKey from '../../utils/formatKey';
import styles from './Card.module.css';

vi.mock('../../utils/formatKey', () => ({
  default: vi.fn().mockImplementation((key) => `test ${key}`),
}));

describe('Card tests', () => {
  const props = {
    name: 'Test Skywalker',
    birthYear: '29BBY',
    eyeColor: 'green',
    gender: 'male',
    height: '190',
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

  test('formatKey mock tests', () => {
    render(<Card {...props} />);
    expect(formatKey).toHaveBeenCalledWith('birthYear');
    expect(formatKey).toHaveBeenCalledWith('eyeColor');
    expect(formatKey).toHaveBeenCalledWith('gender');
    expect(formatKey).toHaveBeenCalledWith('height');
    expect(formatKey).toHaveBeenCalledTimes(4);
  });
});

import { render, screen } from '@testing-library/react';
import Card from './Card';
import { vi } from 'vitest';
import formatPersonAttribute from '../../utils/formatPersonAttribute';
import styles from './Card.module.css';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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

  const renderCardComponent = () => {
    return render(
      <Provider store={store}>
        <Card {...props} />
      </Provider>
    );
  };

  test('Displays name correctly', () => {
    renderCardComponent();
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass(styles.name);
  });

  test('Displays attributes correctly', () => {
    renderCardComponent();
    expect(screen.getByText(props.birth_year)).toBeInTheDocument();
    expect(screen.getByText(props.eye_color)).toBeInTheDocument();
    expect(screen.getByText(props.gender)).toBeInTheDocument();
    expect(screen.getByText(props.height)).toBeInTheDocument();
  });

  test('formatPersonAttribute mock tests', () => {
    renderCardComponent();
    expect(formatPersonAttribute).toHaveBeenCalledWith('birth_year');
    expect(formatPersonAttribute).toHaveBeenCalledWith('eye_color');
    expect(formatPersonAttribute).toHaveBeenCalledWith('gender');
    expect(formatPersonAttribute).toHaveBeenCalledWith('height');
    expect(formatPersonAttribute).toHaveBeenCalledTimes(4);
  });
});

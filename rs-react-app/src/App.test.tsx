import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./components/routes/AppRoutes', () => ({
  default: () => <div data-testid="appRoutesMock">AppRoutes Mock</div>,
}));

describe('App Component', () => {
  test('Renders App Component', () => {
    render(<App />);
    expect(screen.getByTestId('appRoutesMock')).toBeInTheDocument();
  });
});

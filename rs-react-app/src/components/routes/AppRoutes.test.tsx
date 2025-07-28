import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';

vi.mock('../../pages/peoplePage', () => ({
  default: () => <div>Mocked PeoplePage</div>,
}));

vi.mock('../../pages/errorPage', () => ({
  default: () => <div>Mocked ErrorPage</div>,
}));

function routeImplementation(path: string) {
  window.history.pushState({}, '', `/starwars-rsschool${path}`);
  return render(<AppRoutes />);
}

describe('AppRoutes', () => {
  test('Render PeoplePage on path "/"', () => {
    routeImplementation('/');
    expect(screen.getByText('Mocked PeoplePage')).toBeInTheDocument();
  });

  test('Render PeoplePage on path "/:page"', () => {
    routeImplementation('/1');
    expect(screen.getByText('Mocked PeoplePage')).toBeInTheDocument();
  });

  test('Render PeoplePage on path "/:page/:detailsId"', () => {
    routeImplementation('/1/1');
    expect(screen.getByText('Mocked PeoplePage')).toBeInTheDocument();
  });

  test('Render ErrorPage', () => {
    routeImplementation('/test/error/page');
    expect(screen.getByText('Mocked ErrorPage')).toBeInTheDocument();
  });
});

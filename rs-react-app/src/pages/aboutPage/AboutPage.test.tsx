import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

describe('AboutPage Component', () => {
  test('Renders correctly with all elements', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Developer:')).toBeInTheDocument();
    expect(screen.getByText('Alexander Ilyushenko')).toBeInTheDocument();
    expect(screen.getByText('Brest, Belarus')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /wonderful course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://app.rs.school/course/schedule?course=react-2025-q3'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    expect(
      screen.getByRole('button', { name: /back to main/i })
    ).toBeInTheDocument();
  });
});

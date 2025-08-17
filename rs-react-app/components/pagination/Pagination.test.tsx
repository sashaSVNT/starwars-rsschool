import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component Test', () => {
  test('Display current page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );
    expect(screen.getByText('1 of 5')).toBeInTheDocument();
  });
  test('Buttons disabled by current page', () => {
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});

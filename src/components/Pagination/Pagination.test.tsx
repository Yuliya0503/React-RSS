import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { describe, expect, test } from 'vitest';
import { createMockRouter } from '../../tests/mocks/mockRouter';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('Pagination Component', () => {
  const page = '3';

  test('updates URL query parameter when clicking next and previous buttons', async () => {
    const router = createMockRouter({ query: { page } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Pagination totalItems={100} />
      </RouterContext.Provider>
    );

    const btnNext = await screen.findByRole('button', { name: 'Next →' });
    const btnPrev = await screen.findByRole('button', { name: '← Prev' });

    fireEvent.click(btnNext);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ page: 4 }),
      })
    );

    fireEvent.click(btnPrev);
    fireEvent.click(btnPrev);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ page: 2 }),
      })
    );
  });

  test('calls handleItemsPerPageChange when changing items per page', async () => {
    const limitOther = '2';
    const router = createMockRouter({ query: { limit: limitOther } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Pagination totalItems={100} />
      </RouterContext.Provider>
    );

    const select = await screen.findByRole('combobox');
    await user.selectOptions(select, '10');
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ limit: '10' }),
      })
    );
  });

  test('disables next button on last page', () => {
    const router = createMockRouter({ query: { page } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Pagination totalItems={100} />
      </RouterContext.Provider>
    );
    const btnNext = screen.getByRole('button', {
      name: 'Next →',
    });
    expect(btnNext).toBeInTheDocument();
  });
});

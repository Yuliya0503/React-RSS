import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination component', () => {
  const currentPage = 2;
  const handlePageChange = vi.fn();
  const handleItemsPerPageChange = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/some-path']}>
        <Pagination
          currentPage={currentPage}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </MemoryRouter>
    );
  });

  test('updates URL query parameter when clicking next and previous buttons', async () => {
    const btnNext = screen.getByRole('button', { name: '→' });
    const btnPrev = screen.getByRole('button', { name: '←' });

    await user.click(btnNext);
    expect(handlePageChange).toBeCalledWith(currentPage + 1);

    await user.click(btnPrev);
    expect(handlePageChange).toBeCalledWith(currentPage - 1);
  });

  test('calls onItemsPerPageChange when changing items per page', async () => {
    const select = screen.getByLabelText('items per page select element');

    await user.selectOptions(select, '5');
    expect(handleItemsPerPageChange).toBeCalledWith(5);

    await user.selectOptions(select, '2');
    expect(handleItemsPerPageChange).toBeCalledWith(2);
  });

  test('disables next button on last page', () => {
    render(
      <MemoryRouter initialEntries={['/some-path']}>
        <Pagination
          currentPage={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </MemoryRouter>
    );
    const btnNextElements = screen.getAllByRole('button', { name: '→' });
    const btnNext = btnNextElements[btnNextElements.length - 1];

    expect(btnNext).toBeDisabled();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import user from '@testing-library/user-event';
import { createMockRouter } from '../../tests/mocks/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Header from './Header';

describe('SearchPage Component', () => {
  test('saves the entered search term to local storage when the Search button is clicked', async () => {
    const searchTerm = 'Darth Vader';
    const router = createMockRouter({ query: { search: searchTerm } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Header />
      </RouterContext.Provider>
    );

    const searchBtn = await screen.findByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');

    await user.type(input, searchTerm);
    await user.click(searchBtn);

    expect(input).toHaveValue(searchTerm);
  });
});

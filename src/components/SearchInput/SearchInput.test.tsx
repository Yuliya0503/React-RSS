import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import PeopleProvider from '../../Context/PeopleContext';
import SearchProvider from '../../Context/SearchContext';
import { searchTermLS } from '../../models/constants';
import SearchPage from '../SearchPage/SearchPage';
import { vi } from 'vitest';

const setItem = vi.fn();
const getItem = vi.fn();
const localStorageMock = { setItem, getItem };
vi.stubGlobal('localStorage', localStorageMock);

describe('Search component', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    user.setup();

    const searchTerm = 'C-3PO';

    render(
      <BrowserRouter>
        <SearchProvider>
          <PeopleProvider>
            <SearchPage />
          </PeopleProvider>
        </SearchProvider>
      </BrowserRouter>
    );

    const searchButton = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');

    await user.type(input, searchTerm);
    await user.click(searchButton);

    expect(setItem).toHaveBeenCalledWith(searchTermLS, searchTerm);
  });
});

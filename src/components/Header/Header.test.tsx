import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Store/Store';
import { vi } from 'vitest';
import user from '@testing-library/user-event';
import { searchTermLS } from '../../models/constants';
import SearchPage from '../SearchPage/SearchPage';

const setItem = vi.fn();
const localStorageMock = { setItem };
vi.stubGlobal('localStorage', localStorageMock);

describe('SearchPage Component', () => {
  test('saves the entered search term to local storage when the Search button is clicked', async () => {
    const searchTerm = 'Darth Vader';
    user.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </Provider>
    );

    const searchBtn = await screen.findByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');

    await user.type(input, searchTerm);
    await user.click(searchBtn);

    await waitFor(() => {
      expect(setItem).toHaveBeenCalledWith(searchTermLS, searchTerm);
    });
  });
});

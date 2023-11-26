import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PeopleSection from './PeopleSection';
import { createServer } from '../../tests/mocks/server';
import store from '../../Store/Store';
import { Provider } from 'react-redux';
import { setPageItems } from '../../Store/Reducers/PageSliceReduser';
import { setRootSearch } from '../../Store/Reducers/SearchReduser';
import { apiPeople } from '../../API/CardService';
import { http, HttpResponse } from 'msw';
import { PeopleResponse } from '../../tests/data/peopleResponse';

const server = createServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  apiPeople.util.resetApiState();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('PeopleSection Component', () => {
  const limit = 4;

  test('renders the specified number of cards', async () => {
    store.dispatch(setPageItems(limit));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeopleSection />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findAllByRole('listitem')).toHaveLength(limit);
  });

  test('displays an appropriate message if no cards are present', async () => {
    server.use(
      http.get('https://swapi.dev/api/people', () =>
        HttpResponse.json({ ...PeopleResponse, results: [] })
      )
    );
    const searchTerm = 'unknown';
    store.dispatch(setRootSearch(searchTerm));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeopleSection />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText(/No result found./i)).toBeInTheDocument();
  });
});

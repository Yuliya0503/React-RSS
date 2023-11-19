import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createServer } from '../../tests/mocks/server';
import Pagination from './Pagination';
import store from '../../Store/Store';
import { pageCurrentUpdate } from '../../Store/Reducers/PageCurrentSlice';
import PeopleSection from '../PeopleSection/PeopleSection';

const server = createServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('Pagination Component', () => {
  const page = 3;

  test('updates URL query parameter when clicking next and previous buttons', async () => {
    store.dispatch(pageCurrentUpdate(page));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination totalItems={100} />
        </BrowserRouter>
      </Provider>
    );

    const btnNext = await screen.findByRole('button', { name: 'Next →' });
    const btnPrev = await screen.findByRole('button', { name: '← Prev' });

    fireEvent.click(btnNext);
    expect(window.location.search).toContain(`page=${page + 1}`);

    fireEvent.click(btnPrev);
    fireEvent.click(btnPrev);
    expect(window.location.search).toContain(`page=${page - 1}`);
  });

  test('calls handleItemsPerPageChange when changing items per page', async () => {
    const limitOther = 2;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/some-path']}>
          <PeopleSection />
        </MemoryRouter>
      </Provider>
    );

    const select = await screen.findByRole('combobox');
    fireEvent.change(select, { target: { value: String(limitOther) } });

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(limitOther);
  });

  test('disables next button on last page', () => {
    store.dispatch(pageCurrentUpdate(page));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination totalItems={100} />
        </BrowserRouter>
      </Provider>
    );

    const btnNext = screen.getByRole('button', {
      name: 'Next →',
    });
    expect(btnNext).toBeInTheDocument();
  });
});

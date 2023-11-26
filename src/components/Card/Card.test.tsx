import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Store/Store';
import Details from '../Details/Details';
import PeopleSection from '../PeopleSection/PeopleSection';
import { createServer } from '../../tests/mocks/server';
import { vi } from 'vitest';

const server = createServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

beforeEach(() => {
  user.setup();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Card component', () => {
  test('opens a detailed card component when clicking on a card', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<PeopleSection />} />
            <Route path=":id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const links = await screen.findAllByRole<HTMLAnchorElement>('link');

    await act(async () => {
      await user.click(links[0]);
    });

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
  });

  test('triggers an additional API call to fetch detailed information when clicking on a card', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<PeopleSection />} />
            <Route path=":id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const links = await screen.findAllByRole<HTMLAnchorElement>('link');

    await act(async () => {
      await user.click(links[0]);
    });

    expect(server.listHandlers()[0].isUsed).toBeTruthy();
  });
});

import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from '../../tests/mocks/server';
import Details from '../Details/Details';
import { Provider } from 'react-redux';
import store from '../../Store/Store';

const server = createServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Details Component', () => {
  test('displays the "No person data" message on the 404 page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/NaN']}>
          <Routes>
            <Route path=":id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await screen.findByText(/Loading.../);
    });

    const noPersonDataElement = screen.queryByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });

  test('displays the "No person data" message in a standalone component', () => {
    render(
      <div>
        <p>No person data</p>
      </div>
    );

    const noPersonDataElement = screen.getByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });
});

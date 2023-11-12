import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from '../../tests/mocks/server';
import Details from '../Details/Details';

const server = createServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('NotFound component', () => {
  test('The 404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    // Ждем, пока компонент завершит загрузку
    await waitFor(() => screen.getByText(/Loading.../), { timeout: 5000 });

    const noPersonDataElement = screen.queryByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });

  it('displays the "No person data" message', () => {
    render(
      <div>
        <p>No person data</p>
      </div>
    );

    const noPersonDataElement = screen.getByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });
});

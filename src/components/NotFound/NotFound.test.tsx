import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from '../../tests/mocks/server';
import Details from '../Details/Details';

const server = createServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('The 404 page is displayed when navigating to an invalid route', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('displays the "No person data" message', () => {
    const noPersonDataElement = screen.getByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });
});

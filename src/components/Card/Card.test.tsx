import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PeopleContext } from '../../Context/PeopleContext';
import { getPerson } from '../../API/CardService';
import { peopleMock } from '../../tests/data/peopleMock';
import Details from '../Details/Details';
import PeopleSection from '../PeopleSection/PeopleSection';

vi.mock('../../API/CardService', () => ({
  getPerson: vi.fn((id) => Promise.resolve(peopleMock[id - 1])),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('Card component', () => {
  test('should open a detailed card component when clicking on a card', async () => {
    render(
      <MemoryRouter>
        <PeopleContext.Provider value={peopleMock}>
          <Routes>
            <Route
              path="/"
              element={
                <PeopleSection isLoading={false} limit={1}>
                  <></>
                </PeopleSection>
              }
            >
              <Route path=":id" element={<Details />} />
            </Route>
          </Routes>
        </PeopleContext.Provider>
      </MemoryRouter>
    );

    user.click(screen.getByRole('link'));

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  test('should trigger an additional API call to fetch detailed information when clicking on a card', async () => {
    render(
      <MemoryRouter>
        <PeopleContext.Provider value={peopleMock}>
          <Routes>
            <Route
              path="/"
              element={
                <PeopleSection isLoading={false} limit={1}>
                  <></>
                </PeopleSection>
              }
            >
              <Route path=":id" element={<Details />} />
            </Route>
          </Routes>
        </PeopleContext.Provider>
      </MemoryRouter>
    );

    user.click(screen.getByRole('link'));
    await waitFor(() => {
      expect(getPerson).toHaveBeenCalled();
    });
  });
});

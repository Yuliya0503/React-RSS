import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import user from '@testing-library/user-event';
import { createServer } from '../../tests/mocks/server';
import { peopleMock } from '../../tests/data/peopleMock';
import Details from './Details';

const server = createServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Details component', () => {
  test('displays detailed card data correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    const { gender, height, skin_color, hair_color, eye_color } = peopleMock[0];

    expect(screen.getByText(gender, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(height, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(skin_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(hair_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(eye_color, { exact: false })).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test('hides the component when clicking the close button', async () => {
    user.setup();

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  test('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/100']}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const loading = await screen.findByTestId('loading', {}, { timeout: 5000 });
    expect(loading).toBeInTheDocument();
  });
});

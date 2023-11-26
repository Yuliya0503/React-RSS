import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Store/Store';
import { createServer } from '../../tests/mocks/server';
import { peopleMock } from '../../tests/data/peopleMock';
import Details from './Details';

const server = createServer();

beforeAll(() => server.listen());
afterAll(() => server.close());

const renderDetailsWithRouter = (path: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path=":id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Details Component', () => {
  test('displays detailed card data correctly', async () => {
    renderDetailsWithRouter('/1');

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
    renderDetailsWithRouter('/1');

    const closeButton = await screen.findByRole('button', { name: 'Close' });

    await act(async () => {
      await user.click(closeButton);
    });

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  test('displays loading indicator while fetching data', async () => {
    renderDetailsWithRouter('/100');

    const loading = await screen.findByTestId('loading', {}, { timeout: 5000 });
    expect(loading).toBeInTheDocument();
  });
});

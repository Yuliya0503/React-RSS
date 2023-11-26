import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { peopleMock } from '../../../tests/data/peopleMock';
import CharacterInfo from './CharacterInfo';

vi.mock('../../API/CardService', () => ({
  getPerson: vi.fn((id) => Promise.resolve(peopleMock[id - 1])),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('CharacterInfo component', () => {
  test('the card component renders the relevant card data', () => {
    const person = peopleMock[0];

    render(
      <BrowserRouter>
        <CharacterInfo person={person} />
      </BrowserRouter>
    );
    expect(screen.getByText(person.name)).toBeInTheDocument();
  });
});

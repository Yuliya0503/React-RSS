import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { peopleMock } from '../../../tests/data/peopleMock';
import CharacterInfo from './CharacterInfo';
import { createMockRouter } from '../../../tests/mocks/mockRouter';

vi.mock('../../API/CardService', () => ({
  getPerson: vi.fn((id) => Promise.resolve(peopleMock[id - 1])),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('CharacterInfo component', () => {
  test('the card component renders the relevant card data', async () => {
    const person = peopleMock[0];
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <CharacterInfo person={person} />
      </RouterContext.Provider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText(person.name)).toBeInTheDocument();
  });
});

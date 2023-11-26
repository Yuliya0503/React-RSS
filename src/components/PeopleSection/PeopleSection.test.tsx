import { render, screen } from '@testing-library/react';
import PeopleSection from './PeopleSection';
import { PeopleResponse } from '../../tests/data/peopleResponse';
import { describe, expect, test } from 'vitest';
import { createMockRouter } from '../../tests/mocks/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('PeopleSection Component', () => {
  const limit = '4';

  test('renders the specified number of cards', async () => {
    const router = createMockRouter({ query: { limit } });

    render(
      <RouterContext.Provider value={router}>
        <PeopleSection people={PeopleResponse} />
      </RouterContext.Provider>
    );

    expect(await screen.findAllByRole('listitem')).toHaveLength(+limit);
  });
});

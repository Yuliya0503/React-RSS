import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { describe, expect, test } from 'vitest';
import { peopleMock } from '../../tests/data/peopleMock';
import Card from './Card';
import { createMockRouter } from '../../tests/mocks/mockRouter';

describe('Card component', () => {
  test('opens a detailed card component when clicking on a card', async () => {
    const router = createMockRouter({});
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Card person={peopleMock[0]} />
      </RouterContext.Provider>
    );

    const link = screen.getByRole<HTMLAnchorElement>('link');
    await user.click(link);

    expect(router.push).toHaveBeenCalledWith(
      '/1',
      expect.anything(),
      expect.anything()
    );
  });
});

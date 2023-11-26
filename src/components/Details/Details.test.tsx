import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { peopleMock } from '../../tests/data/peopleMock';
import Details from './Details';
import { describe, expect, test } from 'vitest';
import { createMockRouter } from '../../tests/mocks/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import PeopleSection from '../PeopleSection/PeopleSection';
import { PeopleResponse } from '../../tests/data/peopleResponse';

describe('Details Component', () => {
  test('displays detailed card data correctly', async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Details person={peopleMock[0]} />
      </RouterContext.Provider>
    );
    const closeButton = screen.getByRole('button', { name: 'Close' });
    const { gender, height, skin_color, hair_color, eye_color } = peopleMock[0];

    expect(screen.getByText(gender, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(height, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(skin_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(hair_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(eye_color, { exact: false })).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test('hides the component when clicking the close button', async () => {
    const router = createMockRouter({});
    user.setup();
    render(
      <RouterContext.Provider value={router}>
        <PeopleSection people={PeopleResponse}>
          <Details person={peopleMock[0]} />
        </PeopleSection>
      </RouterContext.Provider>
    );

    const button = await screen.findByRole('button', { name: 'Close' });
    await user.click(button);
    expect(router.back).toHaveBeenCalled();
  });
});

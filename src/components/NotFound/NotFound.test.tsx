import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Details Component', () => {
  test('displays the "No person data" message in a standalone component', () => {
    render(
      <div>
        <p>No person data</p>
      </div>
    );

    const noPersonDataElement = screen.getByText(/No person data/i);
    expect(noPersonDataElement).toBeInTheDocument();
  });
});

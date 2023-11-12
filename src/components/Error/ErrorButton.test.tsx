import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  test('renders without crashing', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Oops! Error!')).toBeInTheDocument();
  });

  test('does not throw an error initially', () => {
    expect(() => render(<ErrorButton />)).not.toThrow();
  });
});

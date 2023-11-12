import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../../models/constants';
import ErrorSection from './ErrorSection';

describe('ErrorSection component', () => {
  test('renders without crashing', () => {
    render(<ErrorSection />);
    expect(screen.getByText(ErrorMessage)).toBeInTheDocument();
  });

  test('renders with an error message', () => {
    const originalErrorMessage = ErrorMessage;

    render(<ErrorSection />);
    expect(screen.getByText(originalErrorMessage)).toBeInTheDocument();
  });

  test('does not throw an error initially', () => {
    expect(() => render(<ErrorSection />)).not.toThrow();
  });
});

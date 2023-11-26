import { render, fireEvent } from '@testing-library/react';
import SearchButton from './SearchButton';
import { vi } from 'vitest';

test('renders SearchButton component', () => {
  const { getByText } = render(<SearchButton onClick={() => {}} />);
  const searchButton = getByText('Search');

  expect(searchButton).toBeInTheDocument();
});

test('calls onClick prop when button is clicked', () => {
  const onClickMock = vi.fn();
  const { getByText } = render(<SearchButton onClick={onClickMock} />);
  const searchButton = getByText('Search');

  fireEvent.click(searchButton);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

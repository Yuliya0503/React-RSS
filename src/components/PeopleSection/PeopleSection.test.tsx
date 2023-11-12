import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PeopleContext } from '../../Context/PeopleContext';
import { peopleMock } from '../../tests/data/peopleMock';
import PeopleSection from './PeopleSection';

describe('PeopleSection component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    const limit = 4;
    render(
      <BrowserRouter>
        <PeopleContext.Provider value={peopleMock}>
          <PeopleSection isLoading={false} limit={limit}>
            <></>
          </PeopleSection>
        </PeopleContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(limit);
  });
  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <BrowserRouter>
        <PeopleContext.Provider value={[]}>
          <PeopleSection isLoading={false} limit={10}>
            <></>
          </PeopleSection>
        </PeopleContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/No result found./i)).toBeInTheDocument();
  });
  test('displays loading message during data loading', () => {
    render(
      <BrowserRouter>
        <PeopleContext.Provider value={[]}>
          <PeopleSection isLoading={true} limit={10}>
            <></>
          </PeopleSection>
        </PeopleContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

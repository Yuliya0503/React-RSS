import React, { useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import PeopleSection from '../PeopleSection/PeopleSection';
import Header from '../Header/Header';
import { usePeope } from '../../hooks/usePeople';
import { DEFAULT_PAGE } from '../../models/constants';
import { useAppSelector } from '../../hooks/reduxHoooks';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const searchTerm = useAppSelector(
    (state) => state.searchSlice.searchRootString
  );
  const limit = useAppSelector((state) => state.pageSlice.limit);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [isLoading, totalResults] = usePeope(searchTerm, currentPage, limit);

  return (
    <main>
      <Header setPage={setCurrentPage} />
      <PeopleSection isLoading={isLoading}>
        <Pagination
          currentPage={currentPage}
          totalItems={totalResults}
          setPage={setCurrentPage}
        />
      </PeopleSection>
    </main>
  );
};

export default SearchPage;

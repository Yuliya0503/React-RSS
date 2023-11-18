import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../../Store/Store';
import { RootState } from '../../Store/RootReduser';
import { setRootSearch } from '../../Store/Reducers/SearchReduser';
import { Pagination } from '../Pagination/Pagination';
import PeopleSection from '../PeopleSection/PeopleSection';
import Header from '../Header/Header';
import { usePeope } from '../../hooks/usePeople';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../../models/constants';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const searchTerm = useSelector(
    (state: RootState) => state.searchSlice.searchRootString
  );
  const limit = useSelector((state: RootState) => state.pageSlice.limit);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [isLoading, totalResults] = usePeope(searchTerm, currentPage, limit);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = (search: string) => {
    dispatch(setRootSearch(search));
    setCurrentPage(DEFAULT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  return (
    <main>
      <Header onClick={handleSearchClick} searchTerm={searchTerm} />
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

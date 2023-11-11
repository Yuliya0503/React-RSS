import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import PeopleSection from '../PeopleSection/PeopleSection';
import Header from '../Header/Header';
import { usePeope } from '../../hooks/usePeople';
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  SEARCH_PARAM_PAGE,
} from '../../models/constants';
import { useSearch } from '../../hooks/useSearch';
import { useSearchDispatch } from '../../hooks/useSearchDispatch';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const searchTerm = useSearch();
  const setSearchTerm = useSearchDispatch();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [data, isLoading, totalResults] = usePeope(
    searchTerm,
    currentPage,
    limit
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = (search: string) => {
    setSearchTerm(search);
    initFirstPage();
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    initFirstPage();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ [SEARCH_PARAM_PAGE]: newPage.toString() });
  };

  const initFirstPage = () => {
    setCurrentPage(DEFAULT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  return (
    <main>
      <Header onClick={handleSearchClick} searchTerm={searchTerm} />
      <PeopleSection isLoading={isLoading} data={data} limit={limit}>
        <Pagination
          currentPage={currentPage}
          totalItems={totalResults}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleLimitChange}
        />
      </PeopleSection>
    </main>
  );
};

export default SearchPage;

import styles from './Pagination.module.css';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  SEARCH_PARAM_PAGE,
} from '../../models/constants';
import { useAppSelector, useActions } from '../../hooks/reduxHoooks';
import { selectPage } from '../../Store/Reducers/PageCurrentSlice';
import { selectPageItems } from '../../Store/Reducers/PageSliceReduser';

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const limit = useAppSelector(selectPageItems);
  const currentPage = useAppSelector(selectPage);
  const { setPageItems, pageCurrentUpdate } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT);
  const isPrevButtonDisabled = currentPage <= DEFAULT_PAGE;
  const isNextButtonDisabled = currentPage >= totalPages;

  const handlePageChange = (newPage: number) => {
    pageCurrentUpdate(newPage);
    setSearchParams({ [SEARCH_PARAM_PAGE]: String(newPage) });
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPageItems(+value);
    pageCurrentUpdate(DEFAULT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={isPrevButtonDisabled}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ← Prev
      </button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button
        className={styles.button}
        disabled={isNextButtonDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next →
      </button>
      <select
        className={styles.select}
        value={limit}
        onChange={handleItemsPerPageChange}
      >
        <option value="2">2</option>
        <option value="5">5</option>
        <option value={DEFAULT_LIMIT}>{DEFAULT_LIMIT}</option>
        <option value={totalItems}>All</option>
      </select>
    </div>
  );
};
export default Pagination;

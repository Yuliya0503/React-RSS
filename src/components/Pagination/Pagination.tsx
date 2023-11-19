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
  const limit: number = useAppSelector(selectPageItems);
  const currentPage: number = useAppSelector(selectPage);
  const { setPageItems, pageCurrentUpdate } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages: number = Math.ceil(totalItems / DEFAULT_LIMIT);
  const isPrevButtonDisabled: boolean = currentPage <= DEFAULT_PAGE;
  const isNextButtonDisabled: boolean = currentPage >= totalPages;

  const handlePageChange = (newPage: number): void => {
    pageCurrentUpdate(newPage);
    setSearchParams({ [SEARCH_PARAM_PAGE]: String(newPage) });
  };

  const handleItemsPerPageChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    setPageItems(+value);
    pageCurrentUpdate(DEFAULT_PAGE);
    searchParams.delete(SEARCH_PARAM_PAGE);
    setSearchParams(searchParams);
  };

  const prevPage: number = currentPage - 1;
  const nextPage: number = currentPage + 1;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.prevButton}`}
        disabled={isPrevButtonDisabled}
        onClick={() => handlePageChange(prevPage)}
      >
        ← Prev
      </button>
      <label className={styles.currentPage}>{currentPage}</label>
      <button
        className={`${styles.button} ${styles.nextButton}`}
        disabled={isNextButtonDisabled}
        onClick={() => handlePageChange(nextPage)}
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
      </select>
    </div>
  );
};
export default Pagination;

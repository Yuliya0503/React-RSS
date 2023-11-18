import styles from './Pagination.module.css';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  selectPageItems,
  setPageItems,
} from '../../Store/Reducers/PageSliceReduser';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  SEARCH_PARAM_PAGE,
} from '../../models/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHoooks';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  currentPage,
  totalItems,
  setPage,
}: PaginationProps) => {
  const limit = useAppSelector(selectPageItems);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT);
  const isPrevButtonDisabled = currentPage <= 1;
  const isNextButtonDisabled = currentPage >= totalPages;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ [SEARCH_PARAM_PAGE]: String(newPage) });
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(setPageItems(+value));
    setPage(DEFAULT_PAGE);
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
        ←
      </button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button
        className={styles.button}
        disabled={isNextButtonDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        →
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

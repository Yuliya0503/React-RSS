import styles from './Pagination.module.css';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../models/constants';
import { getSearchParams } from '@/src/helpers/getParams';

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const router = useRouter();
  const { search, limit, page } = getSearchParams(router.query);
  const totalPages: number = Math.max(1, Math.ceil(totalItems / DEFAULT_LIMIT));
  const isPrevButtonDisabled: boolean = page <= DEFAULT_PAGE;
  const isNextButtonDisabled: boolean = page >= totalPages;

  const handlePageChange = (newPage: number): void => {
    router.push({
      pathname: '/',
      query: { search, page: newPage, limit },
    });
  };

  const handleItemsPerPageChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    router.push({
      pathname: '/',
      query: { search, limit: value, page },
    });
  };

  const prevPage: number = page - 1;
  const nextPage: number = page + 1;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.prevButton}`}
        disabled={isPrevButtonDisabled}
        onClick={() => handlePageChange(prevPage)}
      >
        ← Prev
      </button>
      <label className={styles.currentPage}>{page}</label>
      <button
        className={`${styles.button} ${styles.nextButton}`}
        disabled={isNextButtonDisabled}
        onClick={() => handlePageChange(nextPage)}
      >
        Next →
      </button>
      <select
        id="itemsPerPage"
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

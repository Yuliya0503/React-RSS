import styles from './Pagination.module.css';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../models/constants';
import { encode } from 'querystring';

interface PaginationProps {
  totalItems: number;
}

const Pagination = ({ totalItems }: PaginationProps) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));
  const limit: number = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
  const currentPage: number = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const search: string = searchParams.get('search') || '';
  const commonQuery = { pathname: '/', query: { search, currentPage, limit } };

  const totalPages: number = Math.max(1, Math.ceil(totalItems / DEFAULT_LIMIT));
  const isPrevButtonDisabled: boolean = currentPage <= DEFAULT_PAGE;
  const isNextButtonDisabled: boolean = currentPage >= totalPages;

  const handlePageChange = (newPage: number): void => {
    router.push({
      ...commonQuery,
      query: { ...commonQuery.query, currentPage: newPage },
    });
  };

  const handleItemsPerPageChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    router.push({
      ...commonQuery,
      query: { ...commonQuery.query, limit: value },
    });
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

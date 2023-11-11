import styles from './Pagination.module.css';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const defaultItemsPerPage = 10;

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isPrevButtonDisabled = currentPage <= 1;
  const isNextButtonDisabled = currentPage >= totalPages;

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onItemsPerPageChange(+e.target.value);
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
        aria-label="items per page select element"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="2">2</option>
        <option value="5">5</option>
        <option value={defaultItemsPerPage}>{defaultItemsPerPage}</option>
      </select>
    </div>
  );
};

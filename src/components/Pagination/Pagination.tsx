import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChage: (limit: number) => void;
}

const LIMIT = 10;

export const Pagination = ({
  currentPage,
  total,
  limit,
  onPageChange,
  onLimitChage,
}: PaginationProps) => {
  const pageCount = Math.ceil(total / LIMIT);
  const isPrevBtnDisabled = currentPage <= 1;
  const isNextBtnDisabled = currentPage >= pageCount;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChage(+e.target.value);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={isPrevBtnDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>
      <span>{currentPage}</span>
      <button
        className={styles.button}
        disabled={isNextBtnDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
      <select
        className={styles.select}
        aria-label="items per page select element"
        value={limit}
        onChange={handleChange}
      >
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};

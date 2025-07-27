import { useNavigate } from 'react-router-dom';
import styles from './pagination.module.css';

type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // const navigate = useNavigate();

  // // const handlePageChange = (newPage: number) => {
  // //   navigate(`?page=${newPage}`);
  // // };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!(currentPage > 1)}
      >
        Previous
      </button>
      <div className={styles.currentPage}>
        {currentPage} of {totalPages}
      </div>
      <button
        className={styles.paginationButton}
        disabled={!(currentPage < totalPages)}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

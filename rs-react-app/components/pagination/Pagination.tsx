'use client';

import styles from './pagination.module.css';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Pagination');
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!(currentPage > 1)}
      >
        {t('prevButton')}
      </button>
      <div className={styles.currentPage}>
        {currentPage} {t('currOfTotal')} {totalPages}
      </div>
      <button
        className={styles.paginationButton}
        disabled={!(currentPage < totalPages)}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t('nextButton')}
      </button>
    </div>
  );
}

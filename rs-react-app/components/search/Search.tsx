'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import styles from './search.module.css';
import { useTheme } from '../../context/ThemeProvider';
import { useRouter } from 'next/navigation';

type SearchProps = {
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchValue: string;
};

export default function Search({
  onSearchChange,
  onSearchSubmit,
  searchValue,
}: SearchProps) {
  const router = useRouter();
  const { theme, switchTheme } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const searchValue = e.target.value;
      onSearchChange(searchValue);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className={styles.header}>
      <form
        className={styles.topControls}
        onSubmit={handleSubmit}
        aria-label="Search form"
      >
        <input type="text" onChange={handleChange} value={searchValue} />
        <button>Search</button>
      </form>
      <div className={styles.headerBtnGroup}>
        <button
          className={`${styles.headerBtn} ${styles.themeBtn}`}
          onClick={switchTheme}
        >
          {theme}
        </button>
        <button
          className={styles.headerBtn}
          onClick={() => router.push('/about')}
        >
          About
        </button>
      </div>
    </div>
  );
}

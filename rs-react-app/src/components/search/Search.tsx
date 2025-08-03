import { type ChangeEvent, type FormEvent } from 'react';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeProvider';

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
  const navigate = useNavigate();
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
        <button className={styles.headerBtn} onClick={() => navigate('/about')}>
          About
        </button>
      </div>
    </div>
  );
}

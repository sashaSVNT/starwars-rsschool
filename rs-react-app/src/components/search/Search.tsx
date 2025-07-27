import { type ChangeEvent, type FormEvent } from 'react';
import styles from './search.module.css';

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
    <form
      className={styles.topControls}
      onSubmit={handleSubmit}
      aria-label="Search form"
    >
      <input type="text" onChange={handleChange} value={searchValue} />
      <button>Search</button>
    </form>
  );
}

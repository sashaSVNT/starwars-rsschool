import { memo } from 'react';
import styles from './searchComponent.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchComponent({ value, onChange }: Props) {
  return (
    <div className={styles.searchComponent}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search country"
        className={styles.input}
      />
    </div>
  );
}

export default memo(SearchComponent);

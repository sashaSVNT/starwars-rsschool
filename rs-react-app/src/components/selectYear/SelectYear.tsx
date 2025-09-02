import { memo } from 'react';
import styles from './selectYear.module.css';

type Props = {
  selectedYear: number;
  years: number[];
  onYearChange: (year: number) => void;
};

function SelectYear({ selectedYear, years, onYearChange }: Props) {
  return (
    <div className={styles.selectYear}>
      <label htmlFor="select-year">Select year</label>
      <select
        id="select-year"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className={styles.select}
      >
        {years.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(SelectYear);

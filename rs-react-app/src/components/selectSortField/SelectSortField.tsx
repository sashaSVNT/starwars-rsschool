import type { SortByField, SortDirection } from '../../types';
import styles from './selectSortField.module.css';

type Props = {
  sortByField: SortByField;
  sortDirection: SortDirection;
  onSortFieldChange: (field: SortByField) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
};

export default function SelectSortField({
  sortByField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
}: Props) {
  return (
    <div className={styles.selectSort}>
      <label htmlFor="sort-field">Sort by: </label>
      <select
        id="sort-field"
        value={sortByField}
        onChange={(e) => onSortFieldChange(e.target.value as SortByField)}
        className={styles.select}
      >
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>

      <select
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
        className={styles.select}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}

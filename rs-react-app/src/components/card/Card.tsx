import styles from './Card.module.css';
import formatPersonAttribute from '../../utils/formatPersonAttribute';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { toggleItem } from '../../features/selectedItemReducer';

type CardProps = {
  id: string;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  height: string;
  onSelectPerson: (id: string) => void;
};

export default function Card(props: CardProps) {
  const { id, onSelectPerson, name, ...attributes } = props;
  const selectedIds = useSelector(
    (state: RootState) => state.selectedItems.selectedIds
  );
  const isSelected = selectedIds.includes(id);
  const dispatch = useDispatch();

  return (
    <div className={styles.card} onClick={() => onSelectPerson(id)}>
      <input
        type="checkbox"
        checked={isSelected}
        className={styles.cardCheckbox}
        onChange={() => dispatch(toggleItem(id))}
        onClick={(e) => e.stopPropagation()}
      />
      <div className={styles.cardDescription}>
        <h2 className={styles.name}>{name}</h2>
        <table className={styles.attributes}>
          <thead>
            <tr>
              {Object.keys(attributes).map((el, i) => (
                <th key={i} className={styles.cardAttribute}>
                  {formatPersonAttribute(el)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(attributes).map((el, i) => (
                <td key={i}>{el}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

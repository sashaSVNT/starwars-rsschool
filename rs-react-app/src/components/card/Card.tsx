import styles from './Card.module.css';
import formatPersonAttribute from '../../utils/formatPersonAttribute';

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
  console.log(attributes);
  return (
    <div className={styles.card} onClick={() => onSelectPerson(id)}>
      <h2 className={styles.name}>{name}</h2>
      <table className={styles.attributes}>
        <thead>
          <tr>
            {Object.keys(attributes).map((el, i) => (
              <th key={i} style={{ backgroundColor: '#57c7ff' }}>
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
  );
}

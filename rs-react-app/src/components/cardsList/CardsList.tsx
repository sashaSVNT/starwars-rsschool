import styles from './cardsList.module.css';
import Card from '../card/Card';
import type { PersonResult } from '../../types/personResult.type';
import Spinner from '../spinner';

type CardsListProps = {
  data: PersonResult[];
  isLoading: boolean;
  onSelectPerson: (id: string) => void;
};

export default function CardsList({
  data,
  isLoading,
  onSelectPerson,
}: CardsListProps) {
  return (
    <div className={styles.cardsContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner isLoading={isLoading} />
        </div>
      ) : data.length ? (
        data.map((el) => {
          const { name, birth_year, eye_color, gender, height } = el.properties;
          return (
            <Card
              id={el.uid}
              key={name}
              name={name}
              birth_year={birth_year}
              eye_color={eye_color}
              gender={gender}
              height={height}
              onSelectPerson={onSelectPerson}
            />
          );
        })
      ) : (
        <div className={styles.noData}>no results</div>
      )}
    </div>
  );
}

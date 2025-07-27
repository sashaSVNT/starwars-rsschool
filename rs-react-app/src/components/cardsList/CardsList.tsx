import styles from './cardsList.module.css';
import Card from '../card/Card';
import type { PersonResult } from '../../types/personResult.type';
import Spinner from '../spinner';

type CardsListProps = {
  data: PersonResult[];
  isLoading: boolean;
};

export default function CardsList({ data, isLoading }: CardsListProps) {
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
              key={name}
              name={name}
              birthYear={birth_year}
              eyeColor={eye_color}
              gender={gender}
              height={height}
            />
          );
        })
      ) : (
        <div className={styles.noData}>no results</div>
      )}
    </div>
  );
}

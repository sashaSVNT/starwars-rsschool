import { Component } from 'react';
import styles from './cardsList.module.css';
import Card from '../card/Card';
import type { PersonResult } from '../../types/personResult.type';

type CardsListProps = {
  data: PersonResult[];
};

class CardsList extends Component<CardsListProps> {
  render() {
    return (
      <div className={styles.cardsContainer}>
        {this.props.data.map((el) => {
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
        })}
      </div>
    );
  }
}

export default CardsList;

import { Component } from 'react';
import styles from './cardsList.module.css';
import Card from '../card/Card';
import type { PersonResult } from '../../types/personResult.type';
import Spinner from '../spinner';

type CardsListProps = {
  data: PersonResult[];
  loading: boolean;
};

class CardsList extends Component<CardsListProps> {
  render() {
    return (
      <div className={styles.cardsContainer}>
        {this.props.loading ? (
          <div className={styles.spinnerContainer}>
            <Spinner loading={this.props.loading} />
          </div>
        ) : this.props.data.length ? (
          this.props.data.map((el) => {
            const { name, birth_year, eye_color, gender, height } =
              el.properties;
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
}

export default CardsList;

import { Component } from 'react';
import styles from './Card.module.css';

interface CardProps {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
}

export default class Card extends Component<CardProps> {
  formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  render() {
    const { name, ...attributes } = this.props;
    return (
      <div className={styles.card}>
        <h2 className={styles.name}>{name}</h2>
        <table className={styles.attributes}>
          <tr>
            {Object.keys(attributes).map((el, i) => (
              <th key={i}>{this.formatKey(el)}</th>
            ))}
          </tr>
          <tr>
            {Object.values(attributes).map((el, i) => (
              <td key={i}>{el}</td>
            ))}
          </tr>
        </table>
      </div>
    );
  }
}

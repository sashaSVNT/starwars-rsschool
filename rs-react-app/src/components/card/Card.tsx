import { Component } from 'react';
import styles from './Card.module.css';
import formatPersonAttribute from '../../utils/formatPersonAttribute';

interface CardProps {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  height: string;
}

export default class Card extends Component<CardProps> {
  render() {
    const { name, ...attributes } = this.props;
    return (
      <div className={styles.card}>
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
}

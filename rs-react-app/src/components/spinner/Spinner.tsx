import { Component } from 'react';
import styles from './spinner.module.css';

type SpinnerProps = {
  loading: boolean;
};

class Spinner extends Component<SpinnerProps> {
  render() {
    if (this.props.loading) {
      return null;
    }
    return <div className={styles.spinner} data-testid="spinner"></div>;
  }
}

export default Spinner;

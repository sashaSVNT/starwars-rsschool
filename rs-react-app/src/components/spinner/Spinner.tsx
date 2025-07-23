import { Component } from 'react';
import styles from './spinner.module.css';

type SpinnerProps = {
  loading: boolean;
};

class Spinner extends Component<SpinnerProps> {
  render() {
    return (
      <div
        className={styles.spinner}
        style={{ display: this.props.loading ? 'block' : 'none' }}
        data-testid="spinner"
      ></div>
    );
  }
}

export default Spinner;

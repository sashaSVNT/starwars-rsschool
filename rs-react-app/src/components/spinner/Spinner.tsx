import styles from './spinner.module.css';

type SpinnerProps = {
  isLoading: boolean;
};

export default function Spinner({ isLoading }: SpinnerProps) {
  return (
    <>
      {isLoading ? (
        <div className={styles.spinner} data-testid="spinner"></div>
      ) : null}
    </>
  );
}

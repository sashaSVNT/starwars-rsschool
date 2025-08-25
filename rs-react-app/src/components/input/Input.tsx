import styles from './input.module.css';

type Props = {
  id: string;
  type: string;
  label: string;
  errorMessage?: string;
  name: string;
};

export default function Input({ id, type, name, label, errorMessage }: Props) {
  return (
    <div className={styles.block}>
      <div className={styles.inputContainer}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input id={id} type={type} name={name} />
      </div>

      <div className={styles.errorContainer} data-testid="error-message">
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}

import styles from './selectAdditionalColumns.module.css';

type Props = {
  allFields: Record<string, string>;
};

export default function SelectAdditionalColumns({ allFields }: Props) {
  return (
    <div className={styles.selectColumns}>
      {Object.entries(allFields).map(([key, value]) => (
        <div className={styles.selectColumnItem}>
          <input id={key} type="checkbox" />
          <label className={styles.label} htmlFor={key}>
            {value}
          </label>
        </div>
      ))}
    </div>
  );
}

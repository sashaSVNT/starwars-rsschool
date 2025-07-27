import styles from './errorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorHeader}>The page was not found</h1>
      <button className={styles.backOnMain}>Back to Main Page</button>
    </div>
  );
}

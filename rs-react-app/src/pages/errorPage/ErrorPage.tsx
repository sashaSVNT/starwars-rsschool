import { useNavigate } from 'react-router-dom';
import styles from './errorPage.module.css';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContainer}>
        <h1 className={styles.errorHeader}>404</h1>
        <p className={styles.errorDescription}>The page was not found</p>
        <button className={styles.errorBackBtn} onClick={() => navigate('/')}>
          ← Back to Main
        </button>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import styles from './aboutPage.module.css';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.aboutPage}>
      <div className={styles.pageWrapper}>
        <p className={styles.position}>Developer:</p>
        <h1 className={styles.name}>Alexander Ilyushenko</h1>
        <div className={styles.location}>Brest, Belarus</div>
        <div className={styles.description}>
          I am ambitious and strive to achieve my goals. I also want to finish
          this{' '}
          <a
            href="https://app.rs.school/course/schedule?course=react-2025-q3"
            target="_blank"
            rel="noopener noreferrer"
          >
            wonderful course
          </a>
          .
        </div>
      </div>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Back to Main
      </button>
    </div>
  );
}

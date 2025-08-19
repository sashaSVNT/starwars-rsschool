import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import styles from '@/styles/aboutPage.module.css';

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');
  return (
    <div className={styles.aboutPage}>
      <div className={styles.pageWrapper}>
        <p className={styles.position}>{t('position')}:</p>
        <h1 className={styles.name}>{t('name')}</h1>
        <div className={styles.location}>{t('location')}</div>
        <div className={styles.description}>
          {t.rich('description', {
            link: (chunks) => (
              <a
                href="https://app.rs.school/course/schedule?course=react-2025-q3"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>
      <Link href="/1" className={styles.backBtn}>
        {t('backButton')}
      </Link>
    </div>
  );
}

'use client';

import styles from '@/styles/errorPage.module.css';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('ErrorPage');
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContainer}>
        <h1 className={styles.errorHeader}>404</h1>
        <p className={styles.errorDescription}>{t('description')}</p>
        <Link href={'/1'} className={styles.errorBackBtn}>
          {t('backButton')}
        </Link>
      </div>
    </div>
  );
}

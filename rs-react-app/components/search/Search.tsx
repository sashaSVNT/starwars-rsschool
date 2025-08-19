'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import styles from './search.module.css';
import { useTheme } from '../../context/ThemeProvider';
import LanguageSwitcher from '@/components/languageSwitcher';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type SearchProps = {
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchValue: string;
};

export default function Search({
  onSearchChange,
  onSearchSubmit,
  searchValue,
}: SearchProps) {
  const { theme, switchTheme } = useTheme();
  const t = useTranslations('SearchComponent');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const searchValue = e.target.value;
      onSearchChange(searchValue);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className={styles.header}>
      <form
        className={styles.topControls}
        onSubmit={handleSubmit}
        aria-label="Search form"
      >
        <input type="text" onChange={handleChange} value={searchValue} />
        <button>{t('searchButton')}</button>
      </form>
      <div className={styles.headerBtnGroup}>
        <LanguageSwitcher />
        <button
          className={`${styles.headerBtn} ${styles.themeBtn}`}
          onClick={switchTheme}
        >
          {t(`${theme}`)}
        </button>
        <Link href={'/about'} className={styles.headerBtn}>
          {t('aboutButton')}
        </Link>
      </div>
    </div>
  );
}

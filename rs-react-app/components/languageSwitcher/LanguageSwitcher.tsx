'use client';

import { LOCALES } from '@/i18n/locales';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './languageSwitcher.module.css';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const onChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}${pathname.replace(/^\/(en|ru)/, '')}`);
  };
  return (
    <select
      value={locale}
      onChange={onChangeLocale}
      className={styles.languageSwitcher}
    >
      {LOCALES.map((el) => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

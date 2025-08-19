import styles from './SelectedItemsCounter.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  selectedIds: string[];
  unselectAll: () => void;
};

export default function SelectedItemsCounter({
  selectedIds,
  unselectAll,
}: Props) {
  const t = useTranslations('SelectedItemsCounter');

  const submitDownload = async () => {
    const response = await fetch('/api/createCsv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedIds }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.location.href = url;
  };
  return (
    <div className={styles.selectedItemsCounter}>
      <p className={styles.selectedItemsQuantity}>
        {selectedIds.length} {t('totalSelectedItems')}
      </p>
      <button className={styles.selectedItemsBtn} onClick={unselectAll}>
        {t('unselectButton')}
      </button>
      <button className={styles.downloadBtn} onClick={submitDownload}>
        {t('download')}
      </button>
    </div>
  );
}

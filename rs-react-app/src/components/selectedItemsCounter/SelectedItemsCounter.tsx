import styles from './SelectedItemsCounter.module.css';

type Props = {
  quantity: number;
  unselectAll: () => void;
};

export default function SelectedItemsCounter({ quantity, unselectAll }: Props) {
  return (
    <div className={styles.selectedItemsCounter}>
      <p className={styles.selectedItemsQuantity}>
        {quantity} items are selected
      </p>
      <button className={styles.selectedItemsBtn} onClick={unselectAll}>
        Unselect all
      </button>
    </div>
  );
}

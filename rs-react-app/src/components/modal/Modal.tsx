import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}

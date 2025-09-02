import { useCallback, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ onClose, children }: Props) {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const onOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}

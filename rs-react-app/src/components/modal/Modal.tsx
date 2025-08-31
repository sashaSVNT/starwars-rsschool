import { useEffect, type ReactNode } from 'react';
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

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onOverlayClick}
      data-testid="overlay"
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}

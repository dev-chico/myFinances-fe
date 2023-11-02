import { ReactNode } from "react";
import styles from "./modal.module.css";

interface IModalProps {
  title: string;
  children: ReactNode;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
}

export function Modal({
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
}: IModalProps) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.modalBody}>{children}</div>

        <footer>
          <button onClick={onCancel} className={styles.btnCancel}>
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={styles.btnConfirm}>
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}

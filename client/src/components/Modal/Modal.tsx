import React from "react";
import styles from "./index.module.scss";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  cancel: string;
  ok: string;
}

export const Modal: React.FC<ModalProps> = ({
  message,
  onConfirm,
  onCancel,
  cancel = "취소",
  ok = "확인",
  title = "알림",
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button
            onClick={onCancel}
            className={`${styles.button} ${styles.gray}`}>
            {ok}
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.button} ${styles.blue}`}>
            {cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

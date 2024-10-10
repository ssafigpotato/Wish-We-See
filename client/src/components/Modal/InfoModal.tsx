import React from "react";
import styles from "./index.module.scss";

interface ModalProps {
  message: string;
  title: string;
}

export const InfoModal: React.FC<ModalProps> = ({
  message,
  title = "알림",
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

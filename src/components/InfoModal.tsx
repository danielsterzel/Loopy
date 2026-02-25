import { useModalExitViaEscape } from "../common/UXUtils";

import styles from "./styleModules/InfoModal.module.css";
import { useEffect } from "react";

type InfoModalProps = {
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  message: string;
  onCancel: () => void;
};

export function InfoModal({
  show,
  type,
  duration=3000,
  message,
  onCancel,
}: InfoModalProps) {
  useModalExitViaEscape(onCancel);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCancel();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onCancel]);

  if (!show) return null;

  const typeClass = {
    success: styles.success,
    error: styles.error,
    warning: styles.warning,
    info: styles.info,
  }[type];

  const iconClass = {
    success: "fa-regular fa-circle-check",
    error: "fa-solid fa-circle-xmark",
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
  };

  return (
    <div
      className={styles.shadowBackground}
      onClick={(e) => {
        e.stopPropagation();
        onCancel();
      }}
    >
      <div className={`${styles.popUp} ${typeClass}`} onClick={(e) => e.stopPropagation()}>
        <i className={iconClass[type]}></i>
        <em>{message}</em>
      </div>
    </div>
  );
}

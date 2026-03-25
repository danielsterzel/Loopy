import { useEffect } from "react";
import { FocusTrap } from "focus-trap-react";

import styles from "./styleModules/ConfirmModal.module.css";

type ConfirmModalProps = {
  show: boolean;
  macroName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  show,
  macroName,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!show) return null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const name = macroName ?? "Unnamed";

  return (
    <FocusTrap active={show}>
      <div className={styles.shadowBackground} onClick={onCancel}>
        <div className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
          <i
            className={`fa-solid fa-triangle-exclamation ${styles.warningIcon}`}
          ></i>
          <h4>Delete {name} SpotifyMacro?</h4>
          <p>
            <em>This action is permanent and cannot be undone.</em>
          </p>
          <div className={styles.options}>
            <button
              className={`${styles.button} ${styles["button--cancel"]}`}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={`${styles.button} ${styles["button--confirm"]}`}
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

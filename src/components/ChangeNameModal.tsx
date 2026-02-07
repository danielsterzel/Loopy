import { useState, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";

import styles from "./styleModules/ChangeNameModal.module.css";

type ChangeNameModalProps = {
  show: boolean;
  macroId: number;
  currentName: string;
  onCancel: () => void;
  onSave: (macroId: number, newName: string) => void;
};

export function ChangeNameModal({
  show,
  macroId,
  currentName,
  onCancel,
  onSave,
}: ChangeNameModalProps) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  if (!show) return null;

  return (
    <FocusTrap active={show}>
      <div className={styles.shadowBackground} onClick={onCancel}>
        <div
          className={styles.checkbox}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h4>Change Macro Name</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(macroId, name);
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <div className={styles.actions}>
              <button className={styles.discard} type="button" onClick={onCancel}>Discard</button>
              <button className={styles.confirm} type="submit" >Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
}

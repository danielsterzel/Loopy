import { useState, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";

import styles from "./styleModules/CreateMacroModal.module.css";

type CreateMacroModalProps = {
  show: boolean;
  onSave: (
    macroName: string,
    fromSong: string,
    toSong: string,
    crossfadeDuration: number,
  ) => void;
  onCancel: () => void;
};
// id and postition needs to be dynamically allocated.

export function CreateMacroModal({
  show,
  onSave,
  onCancel,
}: CreateMacroModalProps) {
  const [name, setName] = useState("");
  const [crossfadeDuration, setCrossfadeDuration] = useState(0);
  const [fromSong, setFromSong] = useState("");
  const [toSong, setToSong] = useState("");

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
        <div className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
          <h2>Macro Creation</h2>
          {/* formWrapper -> flex + flex-direction: column */}
          <div className={styles.formWrapper}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // onSave()
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              ></input>
            </form>
            <div className={styles.songInputForm}>
              {/* need to implement searching from playlist or using spotify search bar */}
              <form></form>
              <form></form>
            </div>
            {/* crossfadeDuration form */}
            <form></form>
          </div>
          <div className={styles.options}>
            <button onClick={onCancel}>Cancel</button>
            <button
              onClick={() => onSave(name, fromSong, toSong, crossfadeDuration)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

import { useState, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";
import { isValidMacroName } from "../common/StringUtils";
import { InfoModal } from "./InfoModal";

import { useModalExitViaEscape } from "../common/UXUtils";

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
  const [showInvalidMacroNamePopUp, setInavlidMacroNamePopUp] = useState(false);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);
  
  useModalExitViaEscape(onCancel);

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
              if(!isValidMacroName(name)) 
                {
                  setInavlidMacroNamePopUp(true);
                  return;
                }
              onSave(macroId, name);
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => {
                  setName(e.target.value)
              }}
              autoFocus
            />
            <div className={styles.actions}>
              <button
                className={styles.discard}
                type="button"
                onClick={onCancel}
              >
                Discard
              </button>
              <button className={styles.confirm} type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>

      <InfoModal show={showInvalidMacroNamePopUp}
      type={"warning"}
      message="Unfortunately this name is not valid for a macro"
      onCancel={() => setInavlidMacroNamePopUp(false)}/>
      </div>

    </FocusTrap>
  );
}

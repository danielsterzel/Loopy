import { useState, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";

import styles from "./styleModules/CreateMacroModal.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useModalExitViaEscape } from "../common/UXUtils";
import { postMacro } from "../api/MacroApi";
import type { Macro } from "../types/Macro";

import { Slider } from "./Slider";

import { BASE_URL } from "../common/APIBase";
import { isValidMacroName } from "../common/StringUtils";

import { InfoModal } from "./InfoModal";

type CreateMacroModalProps = {
  show: boolean;
  onSave: (macro: Macro) => void;
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
  const [showInvalidMacroNamePopUp, setInavlidMacroNamePopUp] = useState(false);

  useModalExitViaEscape(onCancel);

  useEffect(() => {
    fetch(`${BASE_URL}/api/me`, {
      credentials: "include",
    })
      .then((res) => {
        console.log("STATUS", res.status);
        if (res.status === 401) {
          window.location.href = `${BASE_URL}/oauth2/authorization/spotify`;
          return null;
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (show) {
      setInavlidMacroNamePopUp(false);
    }
  }, [show]);

  const handleCreate = async () => {
    if (!isValidMacroName(name)) {
      setInavlidMacroNamePopUp(true);
      return;
    }

    try {
      const macro = await postMacro({
        name,
        fromSong,
        toSong,
        crossfadeDuration,
      });

      if (!macro) return;

      onSave(macro);
      onCancel();

      setName("");
      setFromSong("");
      setToSong("");
      setCrossfadeDuration(0);
    } catch (e) {
      console.error("error: ", e);
    }
  };
  if (!show) return null;

  return (
    <FocusTrap active={show}>
      <div className={styles.shadowBackground} onClick={onCancel}>
        <div className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
          <h2>Macro Creation</h2>
          {/* formWrapper -> flex + flex-direction: column */}
          <div className={styles.formWrapper}>
            <form>
              <label>Macro name</label>
              <input
                type="text"
                value={name}
                maxLength={25}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              ></input>
              <div className={styles.songInputForm}>
                {/* need to implement searching from playlist or using spotify search bar */}
                <div className={styles.songCard}>
                  <label>From Song</label>
                  <i className="fa-regular fa-images"></i>
                  <input
                    type="text"
                    value={fromSong}
                    maxLength={50}
                    onChange={(e) => setFromSong(e.target.value)}
                  ></input>
                </div>
                <div className={styles.songCard}>
                  <label>To Song</label>
                  <i className="fa-regular fa-images"></i>
                  <input
                    type="text"
                    value={toSong}
                    maxLength={50}
                    onChange={(e) => setToSong(e.target.value)}
                  ></input>
                </div>
              </div>
              {/* crossfadeDuration form */}
              <div className={styles.sliderWrapper}>
                <em>CrossFade duration: {crossfadeDuration}s</em>
                <Slider
                  min={0}
                  max={12}
                  value={crossfadeDuration}
                  onChange={setCrossfadeDuration}
                ></Slider>
              </div>

              <div className={styles.options}>
                <button
                  type="button"
                  onClick={onCancel}
                  className={styles.cancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.create}
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <InfoModal
          show={showInvalidMacroNamePopUp}
          type={"warning"}
          message="Unfortunately this name is not valid for a macro"
          onCancel={() => setInavlidMacroNamePopUp(false)}
        />
      </div>
    </FocusTrap>
  );
}

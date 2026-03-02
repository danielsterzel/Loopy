import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import styles from "./styleModules/CreateMacroModal.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { postMacro } from "../api/MacroApi";

import { Slider } from "./Slider";

import { BASE_URL } from "../common/APIBase";
import { isValidMacroName } from "../common/StringUtils";

import { InfoModal } from "./InfoModal";

// id and postition needs to be dynamically allocated.

export function CreateMacroPage() {
  const [name, setName] = useState("");
  const [crossfadeDuration, setCrossfadeDuration] = useState(0);
  const [fromSong, setFromSong] = useState("");
  const [toSong, setToSong] = useState("");
  const [showInvalidMacroNamePopUp, setInavlidMacroNamePopUp] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
    // set ... 
  })

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

      setName("");
      setFromSong("");
      setToSong("");
      setCrossfadeDuration(0);
      navigate("/mainpage", { state: { macroCreated: true } });
    } catch (e) {
      console.error("error: ", e);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <p>Macro Creation</p>
      </div>
      <div className={styles.createMacroPageWrapper}>
        <div className={styles.formWrapper}>
          <form>
            <div className={styles.macroNameInput}>
              <label>Macro name</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                maxLength={30}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              ></input>
            </div>
            <div className={styles.songCard}>
              <p className={styles.optionLabel}>From Song</p>
              <div className={styles.inputForm}>
                <i className="fa-regular fa-images"></i>
                <div className={styles.buttons}>
                  <button type="button" className={styles.button}
                  onClick={() => {
                    navigate("/macros/create/playlists");
                  }}>
                    Select from Playlist
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => {}}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.songCard}>
              <p className={styles.optionLabel}>To Song</p>
              <div className={styles.inputForm}>
                <i className="fa-regular fa-images"></i>
                <div className={styles.buttons}>
                  <button type="button" className={styles.button}>
                    Select from Playlist
                  </button>
                  <button type="button" className={styles.button}>
                    Search
                  </button>
                </div>
              </div>
            </div>
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
                className={styles.cancel}
                onClick={() => {
                  navigate("/mainpage");
                }}
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
        <div className={styles.livePreview}>
          <div className={styles.livePreviewCard}>
            <div className={styles.livePreviewImage}>
              <i className="fa-solid fa-music"></i>
            </div>
            <p className={styles.macroNameProperty}>{name}</p>
            <div className={styles.songsWrapper}>
              <div className={styles.songContainer}>
                <i className="fa-solid fa-music"></i>
                <p className={styles.propertyValue}>
                  FromSong
                  {/* {fromSong} */}
                </p>
              </div>
              <i className="fa-solid fa-angles-right" id={styles.songChangeIcon}></i>
              <div className={styles.songContainer}>
                <i className="fa-solid fa-music"></i>
                <p className={styles.propertyValue}>
                  toSong
                  {/* {toSong} */}
                </p>
              </div>
            </div>
            <em className={styles.crossfadeBadge}>
              {crossfadeDuration}s crossfade
            </em>
          </div>
        </div>
        <InfoModal
          show={showInvalidMacroNamePopUp}
          type={"warning"}
          message="Unfortunately this name is not valid for a macro"
          onCancel={() => setInavlidMacroNamePopUp(false)}
        />
      </div>
    </>
  );
}

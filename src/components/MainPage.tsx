import { useState, useEffect } from "react";
import styles from "./styleModules/MainPage.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Slider } from "./Slider";
import { ConfirmModal } from "./ConfirmModal";
import { EditSongsModal } from "./EditSongsModal";
import { ChangeNameModal } from "./ChangeNameModal";
import type { Macro } from "../types/Macro";
// function renderPanel(){}

export function MainPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [showDeleteConfirm, setDeleteConfirm] = useState(false);
  const [showEditSongsPopUp, setShowEditSongsPopUp] = useState(false);
  const [showChangeName, setChangeName] = useState(false);
  const [showChangeImage, setChangeImage] = useState(false);
  const [editingMacroId, setEditingMacroId] = useState<number | null>(null);
  const [macroList, setMacroList] = useState<Macro | null>(null);

  useEffect(() => {
    fetch("/api/crossfade")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => setSeconds(data.crossfadeVal))
      .catch((err) => console.error(err));
  }, []);

  const saveSeconds = async () => {
    await fetch("soon to be api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crossfadeVal: seconds,
      }),
    });
  };
  const toggleSelected = (id: number) => {
    setSelected((prev) => (prev === id ? null : id));
  };
  const handleRename = (macroId: number, newName: string) => {
    console.log("rename macro", macroId, newName);

    // TODO: later -> API call
    setChangeName(false);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.titleShelf}>
        <div className={styles.title}>Spotify Macros</div>

        <div className={styles.titleRight}>
          <p>Author: Daniel Sterzel</p>
          <div className={styles.iconWrapper}>
            <div className={styles.titleIcons}>
              <a
                href="https://www.linkedin.com/in/daniel-sterzel-2006a63a3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={styles.socialLinks}
              >
                <i className="fa-brands fa-square-linkedin"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100015435408068"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className={styles.socialLinks}
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <p>Defined Macros</p>
          <div className={styles.macroListWrapper}>
            <ul className={styles.macroList}>
              <li
                className={styles.macroRow}
                tabIndex={0}
                role="button"
                aria-label="Select macro"
                onClick={() => toggleSelected(1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSelected(1);
                  }
                }}
              >
                <div className={styles.macroItem}>
                  <i className="fa-solid fa-image"></i> Position 1
                </div>
                <div className={styles.macroActions}>
                  <button
                    aria-label="Edit name"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMacroId(1); // CHANGE TO BACKEDN??? ????? ???? ???
                      setChangeName(true);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    aria-label="Change icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // change image logic
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <i className="fa-regular fa-images"></i>
                  </button>
                </div>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(2)}
                >
                  <i className="fa-solid fa-image"></i> Position 2
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(3)}
                >
                  <i className="fa-solid fa-image"></i> Position 3
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(4)}
                >
                  <i className="fa-solid fa-image"></i> Position 4
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(5)}
                >
                  <i className="fa-solid fa-image"></i> Position 5
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(6)}
                >
                  <i className="fa-solid fa-image"></i> Position 6
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => toggleSelected(7)}
                >
                  <i className="fa-solid fa-image"></i> Position 7
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <main className={styles.panel}>
          {/* THIS NEEDS TO BE REFACTORED WHEN BACKEND IS DONE!!!*/}
          {selected === null && (
            <div className={styles.overview}>
              <h2>Spotify Macros</h2>
              <p>
                Spotify Macros is a way to introduce song to song specific
                crossfade transitions. In order to create one click the button
                below and try out for yourself!
              </p>
              <button
                className={styles.tryOutButton}
                onClick={() => toggleSelected(1)}
              >
                <i className="fa-solid fa-pen-to-square"></i>Try Out Spotify
                Macros
              </button>
            </div>
          )}
          {selected === 1 && (
            <div className={styles.macroDetails}>
              <h2>Position 1</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song D
                </div>
                <div className={styles.songArrowWrapper}>
                  <i className="fa-solid fa-arrow-right-long"></i>
                  <button
                    className={styles.changeSongButton}
                    onClick={() => setShowEditSongsPopUp(true)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    Edit Songs
                  </button>
                </div>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song E
                </div>
              </div>
              <div className={styles.macroSettings}>
                <h3>Settings</h3>
                <span>CrossFade duration</span>
                <div className={styles.crossfadeBadge}>
                  Crossfade: {seconds}s
                </div>
                <div className={styles.sliderWrapper}>
                  <Slider
                    min={0}
                    max={12}
                    value={seconds}
                    onChange={setSeconds}
                  />
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.saveButton} onClick={saveSeconds}>
                  Save
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => setDeleteConfirm(true)}
                >
                  Delete Macro
                </button>
              </div>
            </div>
          )}
          {selected === 2 && (
            <div className={styles.macroDetails}>
              <h2>Position 2</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song A
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song E
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
          {selected === 3 && (
            <div className={styles.macroDetails}>
              <h2>Position 3</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song C
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song B
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
          {selected === 4 && (
            <div className={styles.macroDetails}>
              <h2>Position 4</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song Y
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song T
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
          {selected === 5 && (
            <div className={styles.macroDetails}>
              <h2>Position 5</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song K
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song M
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
          {selected === 6 && (
            <div className={styles.macroDetails}>
              <h2>Position 6</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song F
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song G
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
          {selected === 7 && (
            <div className={styles.macroDetails}>
              <h2>Position 7</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song F
                </div>
                <i className="fa-solid fa-arrow-right-long"></i>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song G
                </div>
                <div className={styles.crossfadeBadge}>Crossfade: xxx</div>
              </div>
            </div>
          )}
        </main>
      </div>
      <ConfirmModal
        show={showDeleteConfirm}
        macroName="Postition1"
        onConfirm={() =>
          // delete (API)
          setDeleteConfirm(false)
        }
        onCancel={() => setDeleteConfirm(false)}
      />
      <EditSongsModal
        show={showEditSongsPopUp}
        fromSong={"Song A"}
        toSong={"Song B"}
        onCancel={() => {
          setShowEditSongsPopUp(false);
        }}
        onSave={() => {
          // api !!!!!!
          setShowEditSongsPopUp(false);
        }}
      />
      {showChangeName && editingMacroId !== null && (
        <ChangeNameModal
          show={showChangeName}
          macroId={editingMacroId}
          currentName={"Position1"} // MACRO LIST ITEM
          onCancel={() => setChangeName(false)}
          onSave={handleRename}
        />
      )}
    </div>
  );
}

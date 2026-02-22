import { useState, useEffect } from "react";
import { useCallback } from "react";

import styles from "./styleModules/MainPage.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { getUserMacros } from "../api/MacroApi";
import { BASE_URL } from "../common/APIBase";

import { Slider } from "./Slider";
import { ConfirmModal } from "./ConfirmModal";
import { EditSongsModal } from "./EditSongsModal";
import { ChangeNameModal } from "./ChangeNameModal";
import { CreateMacroModal } from "./CreateMacroModal";

import type { Macro } from "../types/Macro";
// function renderPanel(){}

export function MainPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const [showDeleteConfirm, setDeleteConfirm] = useState(false);
  const [showEditSongsPopUp, setShowEditSongsPopUp] = useState(false);
  const [showChangeName, setChangeName] = useState(false);
  const [showChangeImage, setChangeImage] = useState(false);
  const [showCreateMacro, setCreateMacro] = useState(false);
  const [editingMacroId, setEditingMacroId] = useState<number | null>(null);
  const [macroList, setMacroList] = useState<Macro[]>([]);

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
        return getUserMacros();
      })
      .then((data) => {
        if (data) setMacroList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleSelected = useCallback((id: number) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  // should post to backend!!!!!
  const handleRename = (macroId: number, newName: string) => {
    setMacroList((prev) =>
      prev.map((m) => (m.id === macroId ? { ...m, name: newName } : m)),
    );
    // TODO: later -> API call
    setChangeName(false);
  };

  const addCreatedMacroToList = (macro: Macro) => {
    setMacroList((prev) => [...prev, macro]);
  };

  const selectedMacro = macroList.find((m) => m.id === selected) ?? null;

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
          <h4 className={styles.listTitle}>Defined Macros</h4>
          {/* PUT / POST ??? definetly redirect to Create Macro Modal*/}
          <button
            className={styles.createMacroButton}
            onClick={() => setCreateMacro(true)}
          >
            Create new Macro
          </button>
          <div className={styles.macroListWrapper}>
            <ul className={styles.macroList}>
              {macroList.map((macro) => (
                <li
                  className={styles.macroRow}
                  key={macro.id}
                  tabIndex={0}
                  role="button"
                  aria-label="Select macro"
                  onClick={() => toggleSelected(macro.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSelected(macro.id);
                    }
                  }}
                >
                  <div className={styles.macroItem}>
                    <i className="fa-solid fa-image"></i>
                    {macro.name}
                  </div>
                  <div className={styles.macroActions}>
                    <button
                      aria-label="Edit name"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingMacroId(macro.id);
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
              ))}
            </ul>
          </div>
        </aside>
        <main className={styles.panel}>
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
                onClick={() => toggleSelected(macroList[0].id)}
              >
                <i className="fa-solid fa-pen-to-square"></i>Try Out Spotify
                Macros
              </button>
            </div>
          )}
          {selectedMacro && (
            <div className={styles.macroDetails}>
              <h2>{selectedMacro.name}</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i>{" "}
                  {selectedMacro.fromSong}
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
                  <i className="fa-regular fa-images"></i>{" "}
                  {selectedMacro.toSong}
                </div>
              </div>
              <div className={styles.macroSettings}>
                <h3>Settings</h3>
                <span>CrossFade duration</span>
                <div className={styles.crossfadeBadge}>
                  Crossfade: {selectedMacro.crossfadeDuration}s
                </div>
                <div className={styles.sliderWrapper}>
                  <Slider
                    min={0}
                    max={12}
                    value={selectedMacro.crossfadeDuration}
                    onChange={(val) => {
                      if (!selectedMacro) return;
                      setMacroList((prev) =>
                        prev.map((m) =>
                          m.id === selectedMacro.id
                            ? { ...m, crossfadeDuration: val }
                            : m,
                        ),
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.saveButton}
                  onClick={() => console.log("save", selectedMacro)}
                >
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
        </main>
      </div>
      <ConfirmModal
        show={showDeleteConfirm}
        macroName={selectedMacro?.name ?? ""}
        onConfirm={() =>
          // delete (API)
          setDeleteConfirm(false)
        }
        onCancel={() => setDeleteConfirm(false)}
      />
      <EditSongsModal
        show={showEditSongsPopUp}
        fromSong={selectedMacro?.fromSong}
        toSong={selectedMacro?.toSong}
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
          currentName={
            macroList.find((m) => m.id === editingMacroId)?.name ?? ""
          } // MACRO LIST ITEM
          onCancel={() => setChangeName(false)}
          onSave={handleRename}
        />
      )}
      <CreateMacroModal
        show={showCreateMacro}
        onSave={addCreatedMacroToList}
        onCancel={() => setCreateMacro(false)}
      />
    </div>
  );
}

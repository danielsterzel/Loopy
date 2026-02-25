import { useState, useEffect } from "react";
import { useCallback } from "react";

import styles from "./styleModules/MainPage.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { getUserMacros } from "../api/MacroApi";
import { postMacroNameChange } from "../api/MacroApi";
import { postMacroReconfiguration } from "../api/MacroApi";
import { isMacroEqual } from "../common/MacroUtils";
import { BASE_URL } from "../common/APIBase";

import { Slider } from "./Slider";
import { ConfirmModal } from "./ConfirmModal";
import { EditSongsModal } from "./EditSongsModal";
import { ChangeNameModal } from "./ChangeNameModal";
import { CreateMacroModal } from "./CreateMacroModal";
import { InfoModal } from "./InfoModal";

import type { Macro } from "../types/Macro";


export function MainPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const [showDeleteConfirm, setDeleteConfirm] = useState(false);
  const [showEditSongsPopUp, setShowEditSongsPopUp] = useState(false);
  const [isChangeMacroNameModalOpen, setIsChangeMacroNameModalOpen] =
    useState(false);
  const [isChangeMacroImageModalOpen, setIsChangeMacroImageModalOpen] =
    useState(false);
  const [isCreateMacroModalOpen, setIsCreateMacroModalOpen] = useState(false);
  const [editingMacroId, setEditingMacroId] = useState<number | null>(null);
  const [userMacrosList, setUserMacrosList] = useState<Macro[]>([]);
  const [uneditedMacro, setUneditedMacro ] = useState<Macro | null> (null);
  const [showSuccessModal, setShowSuccesModal] = useState(false);
  const [showReconfigNotNeeded, setShowReconfigNotNeeded] = useState(false);

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
        if (data) setUserMacrosList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleSelected = useCallback((id: number) => {
    // setSelected((prev) => (prev === id ? null : id));
    setSelected(prev => {
      const newSelected = prev === id? null : id;

      if(newSelected !== null)
        {
          const macro = userMacrosList.find(m => m.id === newSelected) ?? null;
          setUneditedMacro(macro);
        }
        else 
          {
            setUneditedMacro(null);
          }
          return newSelected;
    })

  }, [userMacrosList]);

  // should post to backend!!!!!
  const handleRename = async (id: number, name: string) => {
    setUserMacrosList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: name } : m)),
    );
    try {
      const updatedMacro = await postMacroNameChange({ id, name });
      if (updatedMacro) {
        setUserMacrosList((prev) =>
          prev.map((m) => (m.id === id ? updatedMacro : m)),
        );
      }

      setIsChangeMacroNameModalOpen(false);
    } catch (err) {
      console.log("Rename error:", err);
    }
  };

  const handleSave = async (macro: Macro) => {

    if(!uneditedMacro)
    {
      return;
    }

    if (isMacroEqual(macro, uneditedMacro)) 
    {
      setShowReconfigNotNeeded(true);
      return;
    }

    setUserMacrosList((prev) => {
      return prev.map((m) => (m.id === macro.id ? { ...m, ...macro } : m));
    });


    try {
      const reconfiguredMacro = await postMacroReconfiguration(macro);

      if (reconfiguredMacro) {
        setUserMacrosList((prev) => {
          return prev.map((m) => (m.id === macro.id ? reconfiguredMacro : m));
        });
      }
    } catch (err) {
      console.error("Failed macro reconfiguration", err);
    }
  };

  const addCreatedMacroToList = (macro: Macro) => {
    setUserMacrosList((prev) => [...prev, macro]);
  };

  const selectedMacro = userMacrosList.find((m) => m.id === selected) ?? null;

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
            onClick={() => setIsCreateMacroModalOpen(true)}
          >
            Create new Macro
          </button>
          <div className={styles.macroListWrapper}>
            <ul className={styles.macroList}>
              {userMacrosList.map((macro) => (
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
                        setIsChangeMacroNameModalOpen(true);
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
                onClick={() => {
                  if (userMacrosList.length === 0) {
                    setIsCreateMacroModalOpen(true);
                  } else {
                    toggleSelected(userMacrosList[0].id);
                  }
                }}
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
                      setUserMacrosList((prev) =>
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
                  onClick={() => {
                    console.log("save", selectedMacro);
                    setShowSuccesModal(true);

                    handleSave(selectedMacro);
                  }}
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
      {isChangeMacroNameModalOpen && editingMacroId !== null && (
        <ChangeNameModal
          show={isChangeMacroNameModalOpen}
          macroId={editingMacroId}
          currentName={
            userMacrosList.find((m) => m.id === editingMacroId)?.name ?? ""
          } // MACRO LIST ITEM
          onCancel={() => setIsChangeMacroNameModalOpen(false)}
          onSave={handleRename}
        />
      )}
      <CreateMacroModal
        show={isCreateMacroModalOpen}
        onSave={addCreatedMacroToList}
        onCancel={() => setIsCreateMacroModalOpen(false)}
      />
      {/* do zmiany bo nakłada się jeden na drugi */}
      <InfoModal
        show={showSuccessModal}
        type={"success"}
        message={"Macro has been successfully reconfigured!"}
        onCancel={() => setShowSuccesModal(false)}
      />
      <InfoModal 
        show={showReconfigNotNeeded}
        type={"info"}
        message={"No changes detected. Skiping reconfig..."}
        onCancel={() => setShowReconfigNotNeeded(false)}
      />
    </div>
  );
}

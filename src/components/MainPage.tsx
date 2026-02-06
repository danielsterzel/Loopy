import { useState, useEffect } from "react";
import styles from "./styleModules/MainPage.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Slider } from "./Slider";
import { ConfirmModal } from "./ConfirmModal";
// function renderPanel(){}

export function MainPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [showDeleteConfirm, setDeleteConfirm] = useState(false);
  const [showEditSongsPopUp, setShowEditSongsPopUp] = useState(false);

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
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(1)}
                >
                  <i className="fa-solid fa-image"></i> Position 1
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(2)}
                >
                  <i className="fa-solid fa-image"></i> Position 2
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(3)}
                >
                  <i className="fa-solid fa-image"></i> Position 3
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(4)}
                >
                  <i className="fa-solid fa-image"></i> Position 4
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(5)}
                >
                  <i className="fa-solid fa-image"></i> Position 5
                </button>
              </li>
              <li>
                <button
                  className={styles.macroItem}
                  onClick={() => setSelected(6)}
                >
                  <i className="fa-solid fa-image"></i> Position 6
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <main className={styles.panel}>
          {/* THIS NEEDS TO BE REFACTORED WHEN BACKEND IS DONE!!!*/}
          {selected === 1 && (
            <div className={styles.macroDetails}>
              <h2>Position 1</h2>
              <div className={styles.songsCard}>
                <div className={styles.songWrapperObject}>
                  <i className="fa-regular fa-images"></i> Song D
                </div>
                <div className={styles.songArrowWrapper}>
                  <i className="fa-solid fa-arrow-right-long"></i>
                  <button className={styles.changeSongButton}
                    onClick={() => setShowEditSongsPopUp(true)}>
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
    </div>
  );
}

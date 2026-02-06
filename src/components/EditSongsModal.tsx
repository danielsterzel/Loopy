import { useState } from "react";

import styles from "./styleModules/EditSongsModal.module.css";
import type { Playlist } from "../types/Playlist";
import type { SearchResult } from "../types/SearchResult";

type EditingTarget = "from" | "to" | null;

type Step = "idle" | "choose-source" | "choose-playlist" | "choose-track";

type ChangeSongsModalProps = {
  show: boolean;
  fromSong: string; // temp type TODO: refactor this to Song type object
  toSong: string; // temp type
  onCancel: () => void;
  onSave: (fromSong: string, toSong: string) => void;
};

function SongBox({
  title,
  onReplace,
}: {
  title: string;
  onReplace: () => void;
}) {
  return (
    <div className={styles.songSpecifications}>
      <i className="fa-regular fa-file-image"></i>
      <div className={styles.songDetails}>
        <h4>{title}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button className={styles.replaceSongButton} onClick={onReplace}>
          Replace song
        </button>
      </div>
    </div>
  );
}

export function ChangeSongsModal({
  show,
  fromSong,
  toSong,
  onCancel,
  onSave,
}: ChangeSongsModalProps) {
  const [editingTarget, setEditingTarget] = useState<EditingTarget>(null);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<SearchResult | null>(null);

  if (!show) return null;

  return (
    <div className={styles.shadowBackground}>
      <div className={styles.mainBox}>
        <SongBox title={fromSong} onReplace={() => setEditingTarget("from")} />
        <div className={styles.middleColumn}>
          <i className="fa-solid fa-angles-right"></i>
        </div>
        <SongBox title={toSong} onReplace={() => setEditingTarget("to")} />
        {editingTarget && (
          <p style={{ color: "gray", marginTop: "1rem" }}>
            Editing: {editingTarget === "from" ? fromSong : toSong}
          </p>
        )}
      </div>
    </div>
  );
}

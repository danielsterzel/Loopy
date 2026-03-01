import { useEffect, useState } from "react";

import { getPlaylists } from "../api/PlaylistApi";
import type { Playlist } from "../types/Playlist";

import styles from "./styleModules/PlaylistModal.module.css";
import { FocusTrap } from "focus-trap-react";

export function PlaylistModal() {
  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);
  const [loading, setLoading] = useState(true);

  const [showTotalTracks, setShowTotalTracks] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);
  if (loading) {
    return <div> loading ...</div>;
  }

  if (playlists == null) {
    return null;
  }
  return (
    <FocusTrap>
      <div className={styles.playlistWrapper}>
        <div className={styles.playlists}>
          {playlists.map((p) => (
            <div
              key={p.id}
              className={styles.playlistCard}
              tabIndex={0}
              onMouseEnter={() => {
                setShowTotalTracks(p.id);
              }}
              onFocus={() => {
                setShowTotalTracks(p.id);
              }}
            >
              {p.imageUrl && (
                <img
                  className={styles.image}
                  src={p.imageUrl}
                  width={80}
                  alt="NO IMAGE"
                />
              )}
              <div className={styles.cardText}>
                <p>{p.name}</p>
                <p
                  className={
                    showTotalTracks === p.id
                      ? styles.totalTracksVisible
                      : styles.totalTracksHidden
                  }
                >
                  Total tracks: {p.totalTracks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FocusTrap>
  );
}

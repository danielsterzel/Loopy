import { useEffect, useState } from "react";
import { getTracksForPlaylistId } from "../api/PlaylistApi";

// import { FocusTrap } from "focus-trap-react"; //????? 

import type { Track } from "../types/Track";

import styles from "./styleModules/TrackListModal.module.css";

type TrackListModalProps = {
  show: boolean;
  id: string;
  currentPlaylistNumberId: number;
  songType: string;
};

export function TrackListModal({
  show,
  id,
  currentPlaylistNumberId,
  songType
}: TrackListModalProps) {
  const [tracks, setTracks] = useState<Track[]>([]);

  if (!show) return null;


  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await getTracksForPlaylistId(id);
        if (data) setTracks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTracks();
  }, [show, id]);


  return (
      <div className={styles.shadowBackground}>
        <div className={styles.trackListWrapper} tabIndex={-1}>
          <h3>Choose track from playlist</h3>
          {tracks.map((t) => (
            <div key={t.id} className={styles.trackList}>
              <div className={styles.listItem}
              onClick={() => {
                console.log("Choosen track: ", t.name);
                // navigate("/macros/create", {state: {choosenTrack: t, type:  songType}});
              }}>
                <img
                  src={
                    t.album.images
                      ? t.album.images.at(currentPlaylistNumberId)?.url
                      : ""
                  }
                  alt="nothing"
                  style={{ width: 40, height: 40 }}
                ></img>

                <p>{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

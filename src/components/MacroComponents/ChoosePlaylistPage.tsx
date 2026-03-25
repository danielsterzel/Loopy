import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPlaylists } from "../../api/PlaylistApi";
import type { Playlist } from "../../types/Playlist";

import { TrackListModal } from "./TrackListModal";
import type { Track } from "../../types/Track";

import styles from "./styleModules/ChoosePlaylistPage.module.css";

// need to refactor

export function ChoosePlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTrackList, setShowTrackList] = useState(false);

  const [showTotalTracks, setShowTotalTracks] = useState<string | null>(null);

  const [fromSong, setFromSong] = useState<Track | null>(null);
  const [toSong, setToSong] = useState<Track | null>(null);

  const navigate = useNavigate();
  const handleFromSong = (track: Track) => {
    setFromSong(track);
    setShowTrackList(false);
  };
  const handleToSongChoice = (track: Track) => {
    setToSong(track);
    setShowTrackList(false);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
        if(!data){throw Error("data null");}
        data.map(el => {
          console.log("PlaylistId", el.id)
       });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);
  if (loading) {
    return <div className={styles.loading}> loading ...</div>;
  }

  if (playlists == null) {
    return null;
  }

  playlists.forEach(playlist => console.log(playlist.totalTracks));

  return (
    <>
      <button
        className={styles.goBack}
        onClick={() => {
          navigate("/macros/create");
        }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

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
              onClick={() => {
                setShowTrackList(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                }
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
              <TrackListModal
                show={showTrackList}
                id={p.id}
                currentPlaylistNumberId={0}
                songType="fromSong"
                onConfirmSong={() => {
                  handleFromSong;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

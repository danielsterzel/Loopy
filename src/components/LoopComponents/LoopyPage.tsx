import { useEffect, useState } from "react";

import { getPlayer } from "../../api/PlayerStateAPI";
import { PlayerSongBar } from "../UtilComponents/PlayerSongBar";
import type { PlayerState } from "../../types/PlayerState";

const initialProgress = 0;
const currentTrackIndex = 0;

export function LoopyPage() {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [lastPlayerState, setLastPlayerState] = useState<PlayerState | null>(null);
  const [hasFetchedStateOnce, setHasFetchedStateOnce] = useState(false);
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const fetchPlayer = async () => {
      const data = await getPlayer();
      setPlayerState(data);
      if(data)
      {setHasFetchedStateOnce(true)
        setLastPlayerState(data);
      }
    };

    fetchPlayer();

    const interval = setInterval(fetchPlayer, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayState = playerState ?? lastPlayerState;

  useEffect(() => {
    if(displayState?.progressInMs)
    {
        setProgress(displayState?.progressInMs);
    }
  }, [displayState?.item.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(displayState?.isPlaying){
        setProgress((prev) => prev + 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [displayState?.isPlaying]);

  if(!playerState && !hasFetchedStateOnce)
  {
    return <div className="min-h-screen flex justify-center items-center">
        <p>No song data</p>
    </div>
  }
 
  if (!displayState) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>No song data</p>
    </div>
  );
  }

  const progressSeconds = progress / 1000;
  const songLengthSeconds = displayState.item.durationMs / 1000;


  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="mt-8 w-[70%] grid grid-cols-[auto_1fr] gap-8 items-center 
      border border-borderSubtle p-4 rounded-xl">
        <div className=""><img
          className="w-64 h-64 object-cover"
          src={displayState.item.album.images.at(currentTrackIndex)?.url}
          alt=""
        ></img>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="text-3xl">{displayState.item.name}</p>
          {displayState.isPlaying ? (<p className="text-spotifyGreen animate-pulse">Playing</p>) : (<p className="text-transparent">hidden</p>)}
          <PlayerSongBar progressSeconds={progressSeconds} songLengthSeconds={songLengthSeconds}/>
        </div>
      </div>
    </div>
  );
}

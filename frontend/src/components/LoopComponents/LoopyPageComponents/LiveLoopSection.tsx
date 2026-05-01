
/***
 *  Live loop is the section of the page dedicated to creating a 'on the fly' loops 
 *  
 *  using the currently playing song
 * 
 * ***/

import { useState, useEffect } from "react";

import { PlayerSongBar } from "../../UtilComponents/PlayerSongBar.tsx";

import { usePlayer } from "../../../hooks/usePlayer.ts";

import { msToSeconds } from "../../../common/UXUtils.ts";

const initialProgress = 0;
const currentTrackIndex = 0;

  
export function LiveLoopSection(){

  const [progress, setProgress] = useState(initialProgress);

  const {playerState, lastPlayerState, hasFetchedStateOnce} = usePlayer();


  useEffect(() => {
    if(playerState?.progressInMs != null)
      {
        setProgress(playerState.progressInMs);
      }
  }, [playerState]);


  useEffect(() => {
    const interval = setInterval(() => {
      if(playerState?.isPlaying){
        setProgress((prev) => prev + 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playerState?.isPlaying]);

  const displayState = playerState ?? lastPlayerState;


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
        <div className="mt-8 w-[70%] grid grid-cols-[auto_1fr] gap-8 items-center 
          border border-borderSubtle p-4 rounded-xl">
            <div className=""><img
              className="rounded-sm w-64 h-64 object-cover"
              src={displayState.item.album.images.at(currentTrackIndex)?.url}
              alt=""
            ></img>
            </div>
            <div className="w-full flex flex-col gap-4">
              <p className="text-3xl">{displayState.item.name}</p>
              {displayState.isPlaying ? (<p className="text-spotifyGreen animate-pulse">Playing</p>) : (<p className="text-transparent">hidden</p>)}
              <PlayerSongBar progressSeconds={progressSeconds} songLengthSeconds={songLengthSeconds}/>
              <div className="flex justify-between">
              <div className="">{msToSeconds(progress)}</div>
              <div className="">{msToSeconds(displayState.item.durationMs)}</div>
              </div>
            </div>
          </div>
        );
}
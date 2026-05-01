import { useState, useEffect } from "react";

import { PlayerSongBar } from "../../UtilComponents/PlayerSongBar";

import { usePlayer } from "../../../hooks/usePlayer";

import { msToSeconds } from "../../../common/UXUtils";

import { motion} from "framer-motion";
import { ProgressingBar } from "../../UtilComponents/ProgressingBar";
import { VerticalAudioWave } from "../../UtilComponents/VerticalAudioWave";

const initialProgress = 0;
const currentTrackIndex = 0;

const ulVariant = {
  hidden: {opacity: 0},
  visible: { opacity: 1,
    transition: {staggerChildren: 0.3}
  }
}

const itemVariant = {
  hidden: {opacity:0, x: -20},
  visible: {opacity: 1, x: 0}
}
  
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
  const songDurationInMs = displayState.item.durationMs;
  const songLengthSeconds = songDurationInMs / 1000;
  const currentlyPlaying = displayState.isPlaying;
  
  
    return (
      <div className="flex-col mt-8 w-[70%] bg-white shadow-lg border border-disabledText rounded-xl p-4">
        <div className="grid grid-cols-[auto_1fr] gap-8 items-center  
          ">
            <div className=""><img
              className="rounded-sm w-64 h-64 object-cover"
              src={displayState.item.album.images.at(currentTrackIndex)?.url}
              alt=""
            ></img>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-emerald rounded-full"></span>
                <p className="tracking-wider uppercase text-sm text-neutral-500">Current Song</p>
                <div className="flex-1 h-px bg-neutral-500"/>
              </div>
              <p className="text-4xl font-bold tracking-wider">{displayState.item.name}</p>
              <div className="flex items-end gap-4 text-emerald">
                <div className="h-12"><VerticalAudioWave isPlaying={currentlyPlaying} color="emerald"/></div>
              {displayState.isPlaying ? (<p className="animate-pulse">Playing</p>) : (<p className="text-transparent">hidden</p>)}
              </div>
              <div className="w-[80%]">
                <PlayerSongBar progressSeconds={progressSeconds} songLengthSeconds={songLengthSeconds}/>
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <div className="">{msToSeconds(progress)}</div>
                <div className="">{msToSeconds(displayState.item.durationMs)}</div>
              </div>

              </div>
              <div className="mt-2 w-full flex text-neutral-500 items-center gap-2">
                <button className="tracking-wider uppercase text-xs">
                  <i className="fa-solid fa-arrow-up-right-from-square pr-1"/>
                Open in Spotify</button>
              </div>
            </div>
          </div>

            <div className="mt-8 flex flex-col gap-4 items-center">
              <div className="flex-col items-center justify-center">
                <div className="flex gap-4 items-center">
                  <i className="fa-solid fa-infinity"></i>
                  <h2 className="mt-4 font-semibold  tracking-wider uppercase text-3xl"> Live loop creation </h2>
                  <i className="fa-solid fa-infinity"></i>
                </div>
                <div className="h-px bg-border"/>
            </div>

            <label>Loop interval</label>
            <ProgressingBar color="emerald" beginning={0} end={10} duration={songDurationInMs}/>


            <motion.ul
            variants={ulVariant}
            initial="hidden"
            animate="visible">
              <motion.li variants={itemVariant}></motion.li>
              <motion.li variants={itemVariant}>Item2</motion.li>
              <motion.li variants={itemVariant}>Item3</motion.li>
              <motion.li variants={itemVariant}>Item4</motion.li>

            </motion.ul>
            </div>
          </div>
        );
}
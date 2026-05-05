import { useState, useEffect } from "react";

import { usePlayer } from "../../../hooks/usePlayer";

import { StartRepeat } from "../../../api/PlayerStateAPI";
import { StopRepeat } from "../../../api/PlayerStateAPI";

import { motion } from "framer-motion";

import { percentToMs } from "../../../common/UXUtils";
import { msToSeconds } from "../../../common/UXUtils";

import { Toggle } from "./Toggle";
import { PlayerSongBar } from "../../UtilComponents/PlayerSongBar";
import { VerticalAudioWave } from "../../UtilComponents/VerticalAudioWave";
import { SliderBar } from "./SliderBar";
import { LoopyLogo } from "../../UtilComponents/LoopyLogo";
import type { StartRepeatRequest } from "../../../types/StartRepeatRequest";

const initialProgress = 0;
const currentTrackIndex = 0;

const initialStart = 0;
const initialEnd = 10;
const defaultLoop : StartRepeatRequest = {startMs: initialStart, endMs: initialEnd};

export function LiveLoopSection() {
  const [progress, setProgress] = useState(initialProgress);

  const [intervalStart, setIntervalStart] = useState(initialStart);
  const [intervalEnd, setIntervalEnd] = useState(initialEnd);

  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loop, setLoop] = useState<StartRepeatRequest>(defaultLoop);

  const { playerState, lastPlayerState, hasFetchedStateOnce } = usePlayer();

  useEffect(() => {
    if (playerState?.progressInMs != null) {
      setProgress(playerState.progressInMs);
    }
  }, [playerState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerState?.isPlaying) {
        setProgress((prev) => prev + 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playerState?.isPlaying]);

  const displayState = playerState ?? lastPlayerState;

  const toggleLoop = () => {
    if(loopEnabled){StartRepeat(loop)}
    else {StopRepeat()}
  }
  useEffect(() => {
    console.log("LOOP", loop);
    toggleLoop();
    console.log("");
  },[loopEnabled]);
  if (!playerState && !hasFetchedStateOnce) {
    return (
      <div id="liveloop" className="mt-24 w-[60%] flex flex-col gap-8 justify-center items-center text-2xl text-center text-pretty ">
        <div>
        <p>You are not currently listening to anything. <br/>
          Couldn't find any song data <i className="fa-regular fa-face-frown"></i></p>
        </div>
        <p>Visit Spotify and play something to make </p> <LoopyLogo /> do its magic!
        <a 
        href="https://open.spotify.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="tracking-wider bg-buttonBg p-4 rounded-lg text-white 
        hover:scale-[1.03] transition-all duration-300"
        >
          Open Spotify
          <i className="ml-2 fa-solid fa-paper-plane"></i>
        </a>
      </div>
    );
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
  const songId = displayState.item.uri;

  return (
    <div id="liveloop" className="flex-col mt-8 w-[70%] bg-white shadow-lg border border-disabledText rounded-xl p-4">
      <div
        className="grid grid-cols-[auto_1fr] gap-8 items-center  
          "
      >
        <div className="">
          <img
            className="rounded-sm w-64 h-64 object-cover"
            src={displayState.item.album.images.at(currentTrackIndex)?.url}
            alt=""
          ></img>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 bg-emerald rounded-full"></span>
            <p className="tracking-wider uppercase text-sm text-neutral-500">
              Current Song
            </p>
            <div className="flex-1 h-px bg-neutral-500" />
          </div>
          <p className="text-4xl font-bold tracking-wider">
            {displayState.item.name}
          </p>
          <div className="flex items-end gap-4 text-emerald">
            <div className="h-12">
              <VerticalAudioWave isPlaying={currentlyPlaying} color="emerald" />
            </div>
            {displayState.isPlaying ? (
              <p className="animate-pulse">Playing</p>
            ) : (
              <p className="text-transparent">hidden</p>
            )}
          </div>
          <div className="w-[80%]">
            <PlayerSongBar
              progressSeconds={progressSeconds}
              songLengthSeconds={songLengthSeconds}
              loopEnabled={loopEnabled}
              startPercent={intervalStart}
              endPercent={intervalEnd}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <div className="">{msToSeconds(progress)}</div>
              <div className="">
                {msToSeconds(displayState.item.durationMs)}
              </div>
            </div>
          </div>
          <div className="mt-2 w-full flex text-neutral-500 items-center gap-2">
            <a
            href={songId}
            target={"_blank"}
            rel="noopener noreferrer"
             className="tracking-wider uppercase text-xs hover:text-neutral-800 hover:scale-[1.10] transition-all duration-300">
              <i className="fa-solid fa-arrow-up-right-from-square pr-1" />
              Open in Spotify
            </a>
          </div>
        </div>
      </div>

      <div className="m-8 flex flex-col gap-4 items-center border border-border rounded-lg p-4 shadow-lg">
        <div className="flex-col items-center justify-center">
          <div className="flex gap-4 items-center">
            <h2 className="mt-4 font-semibold  tracking-wider uppercase text-2xl">
              Live loop creation
            </h2>
          </div>
          <div className="h-px bg-border" />
        </div>

        <div className="mt-8 flex flex-col w-full items-center gap-2">
          <div className="text-neutral-500">
            <i className="fa-solid fa-stopwatch"></i>
            <label className="tracking-wide uppercase ">Loop range</label>
          </div>
          <SliderBar
            start={intervalStart}
            end={intervalEnd}
            color="emerald"
            duration={songDurationInMs}
            startCallback={setIntervalStart}
            endCallback={setIntervalEnd}
          />
          <div className="mt-2 relative border-b border-transparent">
            <motion.button
              onClick={() => {
                const start = percentToMs(intervalStart, songDurationInMs);
                const end = percentToMs(intervalEnd, songDurationInMs);
                setLoop({startMs: start, endMs: end});
                console.log("Saved");
                console.log("START", start);
                console.log("END", end);
              }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg p-2 bg-buttonBg text-white"
            >
              Save configuration
            </motion.button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <motion.div className="relative" initial="init" whileHover="hover">
            <button className="text-neutral-500 hover:text-black transition-colors duration-300 ">
              <i className="mr-1 fa-solid fa-plus"></i>Add to your loops
            </button>

            <motion.div
              variants={{
                init: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 origin-left h-px w-full bg-border"
            />
          </motion.div>
          <div className="flex gap-4 items-center">
            <p className="tracking-wide">Toggle loop</p>
            <Toggle enabled={loopEnabled} callback={() =>{setLoopEnabled(prev => {
              console.log(!prev);
              return !prev;}
            )
            }}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

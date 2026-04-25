import { useCallback, useEffect, useState } from "react";

import {motion} from "motion/react";

import { Link } from "react-router-dom";

import { VerticalAudioWave } from "../UtilComponents/VerticalAudioWave";
import { ProgressingBar } from "../UtilComponents/ProgressingBar";
// import { useActiveSection } from "../../hooks/UseActiveSection";

import SongCover5 from "../../assets/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg";

const SECTION_ID = "loopy";

export function Loopy() {
  // const inView = useActiveSection(SECTION_ID);

  const inView = false;

  return (
    <div
      id={`${SECTION_ID}`}
      className="flex flex-col items-center justify-center
         text-5xl my-32 scroll-mt-24 gap-8"
    >
      <div>
        L<i className="fa-solid fa-infinity text-spotifyGreen"></i>py a loopback
        player for Spotify
      </div>
      <i className="fa-solid fa-arrow-rotate-left text-spotifyGreen"></i>
      <p className="text-mutedText w-full max-w-[50%] text-lg text-center text-pretty">
        Have you ever wanted to replay a specific part of a song on Spotify? If
        you did then allow me to introduce to you Loopy. Just set the interval
        you want to relisten to and enjoy!
      </p>
      <div className="flex gap-3">
        <motion.button 
        whileHover={{scale: 1.05, y:-2}}
        whileTap={{scale:0.9, y:1}}
        transition={{type: "keyframes"}}>
        <Link
          to="/Loopy"
          className="text-lg border border-b orderSubtle
            hover:scale-[1.02] hover:bg-spotifyGreen hover:text-black transition-all duration-[400ms] rounded-md px-4 py-2"
        >
          Try out Loopy
        </Link>
        </motion.button>
      </div>
      <i className="fa-solid fa-arrow-down"></i>
    {/* --- scroll --- */}
    <motion.section className="relative h-[300vh]">
      <div className="sticky top-0 grid grid-cols-2 mt-8 gap-8">
        <div className="flex flex-col justify-center">sample text</div>
        <div className="flex flex-col justify-center">
          <div
            className={`flex flex-col items-center p-12
            justify-center border rounded-xl border-2 border-borderSubtle text-lg
            hover:scale-[1.02] transition-all duration-300
            ${inView ? "animate-slideCardUp" : "animate-slideCardDown"}
            `}
          >
            <p className="text-xl">Choose your song</p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="flex flex-col justify-center items-center 
                  gap-4 px-4 py-4 rounded-md border-2 border-borderSubtle"
              >
                <img src={SongCover5} width="80" className="rounded-md"></img>
                <div className="w-full max-w-[100px] border-b border-gray" />
                <div className="w-full max-w-[120px]"></div>

                <div className="bg-borderSubtle w-24 h-2 rounded-full relative">
                  <div
                    className="absolute left-[0%] w-[40%]
                                        h-full bg-spotifyGreen rounded-full"
                  />
                  <div className="absolute rounded-full left-[30%] -translate-y-[2px] h-3 w-3 bg-white" />
                </div>
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-shuffle text-xs"></i>
                  <i className="fa-solid fa-backward-step text-xs"></i>
                  <i className="fa-solid fa-circle-pause text-lg"></i>
                  <i className="fa-solid fa-forward-step text-xs"></i>
                  <i className="fa-solid fa-repeat text-xs"></i>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-xl">My Favourite Song</p>
                <p className="text-lg">By Artist</p>
                <span className="text-xs text-mutedText">Spotify library</span>
                <div className="m-4 h-[80px] p-4 w-full max-w-[100px]">
                  <VerticalAudioWave />
                </div>
                <p className="mt-1 text-sm text-spotifyGreen animate-pulse">
                  Playing
                </p>
              </div>
            </div>
          </div>
          <div
            className={`relative flex flex-col rounded-xl items-center p-12 
            justify-center border border-2 border-borderSubtle text-lg
            hover:scale-[1.02] transition-all duration-300
            ${inView ? "animate-slideCardUp" : "animate-slideCardDown"}`}
          >
            <p className="mb-6 text-xl">Start Loopin'</p>
            <div className="bg-borderSubtle w-[180px] h-[130px] overflow-hidden rounded-md">
              <img
                src={SongCover5}
                className="w-full h-full object-cover object-bottom"
              ></img>
            </div>
            <div className="w-full max-w-[250px] border border-bottom mt-6"></div>
            <div className="mt-6  flex gap-2 text-2xl items-center">
              <i className="fa-solid fa-shuffle text-lg"></i>
              <i className="fa-solid fa-backward-step text-lg"></i>
              <i className="fa-solid fa-circle-pause text-4xl"></i>
              <i className="fa-solid fa-forward-step text-lg"></i>
              <i className="fa-solid fa-repeat text-lg"></i>
            </div>
            <ProgressingBar beginning={10} end={30} duration={145_520} />
          </div>
        </div>
      </div>
      </motion.section>
    </div>
  );
}

import SongCover from "../../assets/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg";

import { VerticalAudioWave } from "../UtilComponents/VerticalAudioWave.tsx";
import {motion, useTransform} from "motion/react";

import type { CardProps } from "./PropsTypes.ts";

export function ChooseSongCard({scrollYProgress, variant} : CardProps)
{
  const opacity = useTransform(scrollYProgress, [0.1, 0.3,  0.45], [1, 1, 0])

return (
  <motion.div
            variants={variant}
            style={{opacity: opacity}}
            className={`flex flex-col items-center p-12
            justify-center border rounded-xl border-2 border-border text-lg
            bg-cardBackground shadow-md
            hover:scale-[1.02]}
            `}
            >
              <p className="text-xl">Choose your song</p>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="flex flex-col justify-center items-center 
                  gap-4 px-4 py-4 rounded-md border-2 border-border"
                >
                  <img src={SongCover} width="80" className="rounded-md"></img>
                  <div className="w-full max-w-[100px] border-b border-gray" />
                  <div className="w-full max-w-[120px]"></div>

                  <div className="bg-border w-24 h-2 rounded-full relative">
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
                  <span className="text-xs text-mutedText">
                    Spotify library
                  </span>
                  <div className="m-4 h-[80px] p-4 w-full max-w-[100px]">
                    <VerticalAudioWave />
                  </div>
                  <p className="mt-1 text-sm text-spotifyGreen animate-pulse">
                    Playing
                  </p>
                </div>
              </div>
            </motion.div>);
}
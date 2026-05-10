import image from "../../../assets/meric-dagli-7NBO76G5JsE-unsplash.jpg";
import { usePlayer } from "../../../hooks/usePlayer";

import { ImageUploadOverlay } from "./ImageUploadOverlay";

import { ProgressingBar } from "../../UtilComponents/SliderBarView";

import { motion } from "framer-motion";
import { useState } from "react";

export function CreateLoop() {
  const { playerState } = usePlayer();

  const [loopName, setLoopName] = useState("");

  const duration = playerState?.item.durationMs ?? 0;
  const progress = playerState?.progressInMs ?? 0; // REFACTOR: this will need to be calculated
  // from the loop duration not the song

  const progressFactor = duration > 0 ? progress / duration : 0;

  return (
    <div id="createloop" className="w-full flex flex-col gap-4 items-center">
      {/* image placeholder */}
      <h2 className="text-4xl font-bold tracking-wider uppercase">
        Create your loop
      </h2>

      <div
        className="w-[70%] grid grid-cols-[auto_1fr] items-center justify-center border 
      border-disabledText rounded-lg bg-white shadow-lg p-4"
      >
        <div className="flex flex-col gap-6 items-center">
          <div
            className="relative flex items-center justify-center w-80 h-80 
                bg-white/5 border border-border rounded-full"
          >
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                className="text white/10"
              />

              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-emerald"
                animate={{
                  pathLength: progressFactor,
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.3 }}
              />
            </svg>
            <div className="hover:cursor-pointer select-none">
              <ImageUploadOverlay>
                <img
                  className="w-64 h-64 rounded-full object-cover"
                  src={image}
                ></img>
              </ImageUploadOverlay>
            </div>
          </div>
        </div>

        {/* second column */}
        <div className="flex flex-col w-full items-center justify-center gap-4">

          <div className="flex flex-col items-center justify-center gap-4 ">
            {/* <input
              onChange={(e) => {
                const cleanedInput = e.target.value
                  .replace(/[\p{C}]/gu, "")
                  .replace(/[<>]/g, "");

                setLoopName(cleanedInput);
              }}
              maxLength={40}
              type="text"
              className="
              pl-1
              bg-transparent
              outline-none
              focus:outline-none
              focus:ring-0
              border border-border rounded-sm shadow-md
              duration-300
              tranistion-all
            "
            /> */}
          </div>
          {/* <div className="w-[80%]">
          <ProgressingBar
            color="emerald"
            beginning={0}
            end={100}
            duration={duration}
          />
          </div> */}
        </div>
      </div>
    </div>
  );
}

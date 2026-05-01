import image from "../../../assets/meric-dagli-7NBO76G5JsE-unsplash.jpg";
import { usePlayer } from "../../../hooks/usePlayer";

import { ProgressingBar } from "../../UtilComponents/ProgressingBar";

import { motion } from "framer-motion";

export function CreateLoop() {

  const {playerState} = usePlayer();

  const duration = playerState?.item.durationMs ?? 0;
  const progress = playerState?.progressInMs ?? 0; // REFACTOR: this will need to be calculated
  // from the loop duration not the song

  const progressFactor = duration > 0 ? progress / duration : 0;
  console.log("Progress:", progressFactor)


  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center">
      {/* image placeholder */}
        <div className="flex flex-col gap-6">
          <div
            className="relative flex items-center justify-center w-80 h-80 
                bg-white/5 border border-border rounded-full">
                  
                <svg className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100">
                  <circle 
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text white/10"/>


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
                    pathLength: progressFactor}}
                    transition={{type: "tween", ease:"linear", duration: 0.3}}
                  />

                </svg>
                <img
                className="w-64 h-64 rounded-full object-cover"
                src={image}>
                </img>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-xl border-b p-2 border-white">Loop name</label>
            <input type="text" className="focus:outline-none"></input>
          </div>

        </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <ProgressingBar color="emerald" beginning={0} end={100} duration={duration}/>
          </div>

      </div>
  );
}

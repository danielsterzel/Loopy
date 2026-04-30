import {motion, useTransform} from "motion/react";
import type { CardProps } from "./PropsTypes.ts";

import { ProgressingBar } from "../UtilComponents/ProgressingBar.tsx";
import SongCover from "../../assets/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg"


export function StartLoopingCard({scrollYProgress, variant} : CardProps)
{

  const opacity = useTransform(scrollYProgress, [0.55, 0.70, 0.9], [0, 1, 1])

return (
        <motion.div
              variants={variant}
              style={{opacity: opacity}}
              className={`relative flex flex-col rounded-xl items-center p-12 
            justify-center border border-2 border-borderSubtle text-lg
            hover:scale-[1.02]`}
            >
              <p className="mb-6 text-xl">Start Loopin'</p>
              <div className="bg-borderSubtle w-[180px] h-[130px] overflow-hidden rounded-md">
                <img
                  src={SongCover}
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
            </motion.div>
        );
}

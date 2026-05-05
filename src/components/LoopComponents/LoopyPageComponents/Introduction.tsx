import { motion } from "motion/react";
import { CardIcon } from "./CardIcon";

export function Introduction() {
  return (
    // <i class="fa-solid fa-chevron-left"></i> for BUTTON
    <div className="w-full  flex flex-col items-center justify-center">

        <div className="pb-12 relative flex flex-col gap-6 text-center">
          <h2 className=" text-pretty text-5xl font-bold tracking-wide">
            Pick a song and <span className="text-emerald">loop</span> you favourite part
          </h2>
          <h2 className="text-3xl tracking-wider font-semibold">
            or create a loop and save it for later.
          </h2>
            <motion.div
              className="w-full absolute will-change-transform rounded-md
                bottom-0 left-0 h-2 
                bg-gradient-to-r from-spotifyGreen to-emerald "
              initial={{ scaleX: 0, y: 10 }}
              animate={{ scaleX: 1, y: 10 }}
              transition={{
                duration: 1.0,
                ease: "easeIn",
              }}
            />

        </div>
        {/* <div className="grid grid-cols-4">

        <div><CardIcon element={<i className="text-4xl fa-solid fa-music"></i>}/></div>
        <div><CardIcon element={<i className="text-4xl fa-solid fa-arrow-pointer"/>}/></div>
        <div><CardIcon/></div>
        <div><CardIcon/></div>
      </div> */}
      </div>

  );
}

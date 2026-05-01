import { useScroll, useTransform } from "motion/react";
import {useRef } from "react";

import { motion } from "motion/react";
import { StartLoopingCard } from "./StartLoopingCard.tsx";
import { Link } from "react-router-dom";

import { ChooseSongCard } from "./ChooseSongCard.tsx";

const SECTION_ID = "loopy";

const sectionVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const cardVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Loopy() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const scrollbarProgres = useTransform(scrollYProgress, [0.1, 0.9], [0, 1], {clamp: true})

  const steps = [0, 1];

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
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.9, y: 1 }}
          transition={{ type: "keyframes" }}
        >
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
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        ref={sectionRef}
        style={{height: `${steps.length * 100}vh`}}
        className="relative"
      >
        <div className="sticky top-0 h-screen grid grid-cols-[auto_1fr] gap-8 ">

        <div className="flex items-center justify-center">
          <div 
          style={{height: "clamp(200px, 65vh, 600px)"}}
          className="relative w-2">
            <div className="absolute inset-0 rounded-full bg-borderSubtle" />
            <motion.div
              style={{ scaleY: scrollbarProgres }}
              className="absolute inset-0 rounded-full origin-top bg-spotifyGreen will-change-transform"
            />
          </div>
          </div>


          <div className="grid grid-cols-2 gap-8">
            <div className="text-lg flex flex-col justify-center">Some text</div>
            <div className=" flex flex-col justify-center">
              <ChooseSongCard
                variant={sectionVariant}
                scrollYProgress={scrollYProgress}
              />
              <StartLoopingCard
                variant={cardVariant}
                scrollYProgress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

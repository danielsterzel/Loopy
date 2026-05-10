import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

function randomHeight() {
  return `${Math.floor(Math.random() * 80) + 15}%`;
}

export function WaveBar({ color, isPlaying }: any) {
  const controls = useAnimationControls();

  useEffect(() => {
    let interval: any;

    if (isPlaying) {
      interval = setInterval(() => {
        controls.start({
          height: randomHeight(),
          transition: {
            duration: 0.4,
            ease: "easeInOut"
          }
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      className={`w-1 ${color} rounded-full`}
      initial={{ height: "15%" }}
      animate={controls}
    />
  );
}
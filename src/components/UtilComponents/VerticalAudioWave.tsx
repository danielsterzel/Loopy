import { motion, useAnimationControls } from "framer-motion";
import { useMemo, useEffect } from "react";

type Props = {
    color?: string;
    isPlaying: boolean;
}

export function VerticalAudioWave({color, isPlaying} : Props)
{
    const barsData = useMemo(() => {
        return Array.from({ length: 9 }, () => ({
        heights: Array.from({ length: 6 }, () => `${Math.floor(Math.random() * 80) + 15}%`),
        duration: Math.random() * 1.0 + 1.8,
        }));
    }, []); 

    const componentColor = color ? `bg-${color}` : "bg-spotifyGreen";

    return (

        <div className="flex justify-center items-end gap-1 h-full w-full overflow-hidden">
        {barsData.map((bar, i)=> (
            <motion.div 
            key={i}
            className={`w-1 ${componentColor} rounded-full`}
            initial={{height: "15%"}}
            animate={{height: bar.heights}}
            transition={{
                height:{
                    repeat: Infinity,
                    repeatType:"mirror",
                    duration: bar.duration,
                    ease: "linear",
                    delay: i * 0.1
                },
            }}/>
        ))}
        </div>
    );
}
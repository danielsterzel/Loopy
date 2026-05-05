import {motion} from "motion/react";


type Props={
    color: string
};

export function LoopCircle({color} : Props)
{
    const stableCircleColor = color ? `text-${color}/30`: 'text-spotifyGreen/30';
    const animatedCircleColor = color ? `text-${color}`: 'text-spotifyGreen';

    return (
        <div>
            <svg viewBox="0 0 30 30">
                <circle 
                cx="15"
                cy="15"
                r="13"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1"
                className={`${stableCircleColor}`}/>
                <motion.circle
                cx="15"
                cy="15"
                r="13"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="butt"
                className={`${animatedCircleColor}`}
                initial={{pathLength: 0}}
                animate={{pathLength: 1}}
                transition={{
                    duration: 300,
                    repeat: Infinity,
                    ease: "linear",
                }}
                />
            </svg>
        </div>
    );
}
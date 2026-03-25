import { useState, useEffect } from "react";

export function VerticalAudioWave()
{
    const [barLengths, setBarLengths] = useState([15, 60, 50, 20, 20, 10, 35, 50, 60])

    useEffect(() => {
        const interval = setInterval(() => {
            setBarLengths(prev => 
                prev.map(len => {
                    const randomFactor = 0.5 + Math.random();
                    return Math.max(5, Math.min(80, len * randomFactor));
                })
            )
        }, 5)
        return () => clearInterval(interval);
    })

    return(
        <div className="flex justify-center items-end gap-1 h-full">
            {barLengths.map((h, i) => (
            <div
            key={i}
            className="w-[4px] bg-spotifyGreen rounded-full transition-all duration-5"
            style={{
                height: `${h}px`,
                animationDelay: `${i * 0.1}s`
            }}/>
        ))}
        </div>
    );
}
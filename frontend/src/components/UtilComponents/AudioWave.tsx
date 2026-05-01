import { useEffect, useState } from "react";


export function AudioWave()
{
    const [barLengths, setBarLengths] = useState([
        10, 50, 35, 15, 20, 15, 50, 15, 20, 25,
        10, 50, 50, 15, 15 , 50, 50, 8, 8, 12, 30, 5]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBarLengths(prev => 
                prev.map(len => {
                    const randomFactor = 0.54 + Math.random();
                    return Math.max(5, Math.min(80, len * randomFactor));
                })
            )
        }, 5)
        return () => clearInterval(interval);
    })
    return (
    <div className="flex justify-center items-center gap-1 h-10">
        {barLengths.map((h, i) => (
            <div
            key={i}
            className="w-[4px] rounded-full bg-spotifyGreen transition-all duration-5"
            style={{
                height: `${h}px`,
                animationDelay: `${i * 0.1}s`
            }}/>
        ))}
    </div>
    );
}
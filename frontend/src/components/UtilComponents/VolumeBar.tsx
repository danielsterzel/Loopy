import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";

const OFF_THRESH = 0;
const LOW_THRESH = 20;
const MED_THRESH = 70;


const icons: Record<string, JSX.Element> ={
    "volOff": <i className="fa-solid fa-volume-off"></i>,
    "volLow": <i className="fa-solid fa-volume-low"></i>,
    "volMed": <i className="fa-solid fa-volume"></i>,
    "volHigh": <i className="fa-solid fa-volume-high"></i>
}

export function VolumeBar()
{
    const [volumeValue, setVolumeValue] = useState(OFF_THRESH);
    const [drag, setDrag] = useState(false);
    const [controlVisible, setControlVisible] = useState(false);
    
    const barRef = useRef<HTMLDivElement>(null);

    const returnIcon = () => {
        if(volumeValue === 0) return icons.volOff;
        if(volumeValue < LOW_THRESH) return icons.volLow;
        if(volumeValue < MED_THRESH) return icons.volMed;
        else return icons.volHigh;
    }
    
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if(!drag || !barRef.current) return;

            const rect = barRef.current.getBoundingClientRect();

            let percent = ((rect.bottom - e.clientY) / rect.height) * 100; 

            percent = Math.max(0, Math.min(percent, 100));
            setVolumeValue(percent);
        }

        const handleUp = () => {
          setDrag(false);
        };
        
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        }
    }, [barRef, setDrag]);


    return (
        <div 
        className="relative h-full w-full"
        onMouseEnter={() => setControlVisible(true)}
        onMouseLeave={() => setControlVisible(false)}>
            {controlVisible && (
                        <div className="absolute bottom-[100%] h-8 w-6 bg-backgroundCard flex items-center
             justify-center rounded-md">
                
                <div className=" relative bg-white/50 h-6 w-2">
                <div onMouseDown={() => setDrag(true)}
                className="absolute w-3 h-3 bg-white rounded-full -translate-x-[2px]"/>
                </div>
            </div>)}
            {returnIcon()}

        </div>
    );

}
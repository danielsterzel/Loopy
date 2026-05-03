import { useEffect } from "react";

// TODO change to uhhh... formatTime
export function msToSeconds(ms: number)
{
    const seconds = ms / 1000;
    const mins = Math.floor(seconds / 60);
    const formatedSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${formatedSeconds}`;
}

export function formatTimeInPercent(percent: number, duration: number) {
    const totalSeconds = Math.floor((percent / 100) * (duration / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function percentToMs(percent: number, duration: number)
{
    return Math.floor(percent * duration);
}

export function useModalExitViaEscape( onCancel: () => void){
    
    useEffect(() => {
        const onEscape = (e:KeyboardEvent) => 
            {
                if (e.key === "Escape") {onCancel();}
            };
            window.addEventListener("keydown", onEscape);

            return () => window.removeEventListener("keydown", onEscape);

    }, [onCancel]);
}

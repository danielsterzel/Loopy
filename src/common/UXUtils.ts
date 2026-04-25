import { useEffect } from "react";

// TODO change to uhhh... formatTime
export function msToSeconds(ms: number)
{
    const seconds = ms / 1000;
    const mins = Math.floor(seconds / 60);
    const formatedSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${formatedSeconds}`;
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

import { useEffect } from "react";


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
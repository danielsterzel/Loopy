import {useState, useEffect } from "react";
import { getPlayer } from "../api/PlayerStateAPI";
import type { PlayerState } from "../types/PlayerState";
import { PlayerContext } from "../context/PlayerContext";



export function PlayerProvider({children} : {children : React.ReactNode})
{

    const [playerState, setPlayerState] = useState<PlayerState | null>(null);
    const [lastPlayerState, setLastPlayerState] = useState<PlayerState | null>(null);
    const [hasFetchedStateOnce, setHasFetchedStateOnce] = useState(false);

    useEffect(() => {
        const fetchPlayer = async () => {
            const data = await getPlayer();
    
            if(data)
            {
                setHasFetchedStateOnce(true);
                setLastPlayerState(data);
            }
            setPlayerState(data);
        };

        fetchPlayer();
    
        const interval = setInterval(fetchPlayer, 3000);
        return () => clearInterval(interval);
    
      }, []);

    return (
        <PlayerContext.Provider value={{playerState, lastPlayerState, hasFetchedStateOnce}}>
            {children}
        </PlayerContext.Provider>
    );
}
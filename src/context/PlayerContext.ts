import { createContext} from "react";
import type { PlayerState } from "../types/PlayerState";


type PlayerContextType = {
    playerState: PlayerState | null;
    lastPlayerState: PlayerState | null;
    hasFetchedStateOnce: boolean;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);
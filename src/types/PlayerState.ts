import type { Track } from "./Track";


export interface PlayerState {
    track: Track;
    repeatState: string;
    timestamp: number;
    progressInMs: string;
    isPlaying: boolean;
    shuffleStateOn: boolean;
};
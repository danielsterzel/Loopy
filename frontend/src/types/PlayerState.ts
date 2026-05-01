import type { Track } from "./Track.ts";


export interface PlayerState {
    item: Track;
    repeatState: string;
    timestamp: number;
    progressInMs: number;
    isPlaying: boolean;
    shuffleStateOn: boolean;
};
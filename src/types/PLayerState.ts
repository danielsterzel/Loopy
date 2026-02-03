
// tutaj muszę lepiej dopasowac bo ma byc 1:1 z backendem
export interface PlayerState 
{
    isPlaying: boolean
    progressInMs: number,
    repeatState: string,
    shuffleStateOn: boolean,
    track: {
        trackName: string,
        artistNames: string[],
        spotifyTrackUrl: string,
        durationInMin: number
    }
}
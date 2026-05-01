
type Props = {
    progressSeconds: number;
    songLengthSeconds: number;
}

export function PlayerSongBar({progressSeconds, songLengthSeconds} : Props)
{
    const progressPercent = songLengthSeconds > 0 ? 
    Math.min((progressSeconds / songLengthSeconds) * 100, 100)
    : 0;

    return (
        <div className="relative flex justify-center">
            <div className="relative min-w-[100px] max-w-[100%]  w-full h-1 bg-neutral-700 rounded-full">
            <div className="absolute left-0 h-1 bg-emerald rounded-full"
             style={{width: `${progressPercent}%`}}/>
            </div>

        </div>
    );
}
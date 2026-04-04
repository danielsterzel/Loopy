import { useEffect, useState } from "react";

import { getPlayer } from "../../api/PlayerStateAPI";
import { ProgressingBar } from "../UtilComponents/ProgressingBar";
import type { PlayerState } from "../../types/PlayerState";

const initialProgress = 0;
const currentTrackIndex = 0;

export function LoopyPage() {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const fetchPlayer = async () => {
    const data = await getPlayer();
    setPlayerState(data);
  };

  fetchPlayer(); 

  const interval = setInterval(fetchPlayer, 3000);
  return () => clearInterval(interval)},
    []);

      useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => prev + 1000);
        }, 1000);
        return () => clearInterval(interval);
    },[]);
    if(!playerState)
        {
            console.log("null");
        }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-start">
        <div className="w-fit">
            <img src={playerState?.track.album.images.at(currentTrackIndex)?.url} alt="">
            </img>

            <p>{playerState?.track.name}</p>
        </div>
    </div>
  );

}

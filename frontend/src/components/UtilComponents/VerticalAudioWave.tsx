
import { WaveBar } from "./WaveBar";

type Props = {
    color?: string;
    isPlaying: boolean;
}

export function VerticalAudioWave({ color, isPlaying }: Props) {
  const componentColor = color ? `bg-${color}` : "bg-spotifyGreen";

  return (
    <div className="flex justify-center items-end gap-1 h-full w-full overflow-hidden">
      {Array.from({ length: 9 }).map((_, i) => (
        <WaveBar
          key={i}
          color={componentColor}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
}
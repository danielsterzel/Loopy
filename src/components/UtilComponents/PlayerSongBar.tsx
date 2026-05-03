type Props = {
  progressSeconds: number;
  songLengthSeconds: number;
  loopEnabled: boolean;
  startPercent?: number;
  endPercent?: number;
};

export function PlayerSongBar({
  progressSeconds,
  songLengthSeconds,
  loopEnabled,
  startPercent,
  endPercent,
}: Props) {
  const progressPercent =
    songLengthSeconds > 0
      ? Math.min((progressSeconds / songLengthSeconds) * 100, 100)
      : 0;

  return (
    <div className="relative flex justify-center">
      <div className="relative min-w-[100px] max-w-[100%] w-full h-1 bg-neutral-700 rounded-full">
        {/* loop overlay */}
        {loopEnabled && startPercent != null && endPercent != null && (
          <div
            className="absolute top-0 h-1 bg-gray-300 rounded-full"
            style={{
              left: `${startPercent}%`,
              width: `${endPercent - startPercent}%`,
            }}
          />
        )}

        {/* progress */}
        <div
          className="absolute left-0 h-1 bg-emerald rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

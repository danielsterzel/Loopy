import { useState, useEffect, useCallback, useRef } from "react";

type Props = {
  beginning: number;
  end: number;
  width: number;
};

function formatTime(percent: number) {
  const duration = 180;
  const totalSeconds = Math.floor((percent / 100) * duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ProgressingBar({ beginning, end, width }: Props) {
  const [start, setStart] = useState(beginning);
  const [finish, setFinish] = useState(end);
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);

  const barRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(() => {
    setDragging("start");
  }, []);

  const endDrag = useCallback(() => {
    setDragging("end");
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging || !barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      let percent = ((e.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(percent, 100));

      if (dragging === "start") {
        setStart(Math.min(percent, finish - 1));
      } else if (dragging === "end") {
        setFinish(Math.max(start + 1, percent));
      }
    };

    const handleUp = () => {
      setDragging(null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, start, finish]);

  return (
    <div className="w-full flex justify-center py-6">
      <div className="relative" style={{ width: `${width}px` }}>
        {dragging === "start" && (
          <div
            className="absolute -top-10 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap border border-borderSubtle"
            style={{ left: `${start}%` }}
          >
            {formatTime(start)}
          </div>
        )}

        {dragging === "end" && (
          <div
            className="absolute -top-10 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap border border-borderSubtle"
            style={{ left: `${finish}%` }}
          >
            {formatTime(finish)}
          </div>
        )}

        <div
          ref={barRef}
          className="relative bg-borderSubtle h-[12px] rounded-full"
          style={{ width: `${width}px` }}
        >
          <div
            className="absolute top-0 h-full rounded-full bg-spotifyGreen"
            style={{
              left: `${start}%`,
              width: `${finish - start}%`,
            }}
          />

          <div
            onMouseDown={startDrag}
            className="absolute flex items-center justify-center cursor-pointer hover:scale-110 aspect-square w-5 h-5 bg-black border-2 border-spotifyGreen rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{
              left: `${start}%`,
            }}
          >
            <i className="fa-solid fa-caret-down text-xs text-spotifyGreen"></i>
          </div>

          <div
            onMouseDown={endDrag}
            className="absolute flex items-center justify-center cursor-pointer hover:scale-110 aspect-square w-5 h-5 bg-black border-2 border-spotifyGreen rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{
              left: `${finish}%`,
            }}
          >
            <i className="fa-solid fa-caret-down text-xs text-spotifyGreen"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
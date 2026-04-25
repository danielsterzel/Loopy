import { useState, useEffect, useCallback, useRef } from "react";

type Props = {
  beginning: number;
  end: number;
  duration: number;
};



export function ProgressingBar({ beginning, end, duration }: Props) {
  
  const [start, setStart] = useState(beginning);
  const [finish, setFinish] = useState(end);
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);


function formatTime(percent: number) {
    const totalSeconds = Math.floor((percent / 100) * (duration / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

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
    <div className="w-full max-w-2xl flex justify-center py-6">

      <div className="relative w-full">
      <div className="absolute h-[12px] select-none top-full left-0 translate-y-2">{formatTime(start)}</div>


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
          className="relative w-full max-w-2xl bg-borderSubtle h-[12px] rounded-full"
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
            className="absolute flex items-center justify-center cursor-pointer 
            hover:scale-125 hover:shadow-[0_0_4px_rgba(34,197,94,0.8)]
            aspect-square w-5 h-5 bg-spotifyGreen  
             rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{
              left: `${start}%`,
            }}
          >
          </div>

          <div
            onMouseDown={endDrag}
            className="absolute flex items-center justify-center cursor-pointer
             hover:scale-125 hover:shadow-[0_0_8px_rgba(34,197,94,0.8)]
             aspect-square w-5 h-5 bg-spotifyGreen  
             rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{
              left: `${finish}%`,
            }}
          >
          </div>
        </div>
      <div className="absolute  h-[12px] translate-y-2 top-full right-0 select-none">{formatTime(finish)}</div>

      </div>

    </div>
  );
}
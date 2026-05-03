import { useState, useEffect, useCallback, useRef } from "react";
import { formatTimeInPercent } from "../../common/UXUtils";
type Props = {
  beginning: number;
  end: number;
  duration: number;
  color?: string; 
};



export function ProgressingBar({ beginning, end, duration, color }: Props) {
  
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

  const barColor = color ? `bg-${color}` : "bg-spotifyGreen";

  return (
    <div className="w-full max-w-2xl flex justify-center">

      <div className="relative w-full">
      <div className="absolute h-[12px] select-none top-full left-0 translate-y-2">{formatTimeInPercent(start, duration)}</div>


        {dragging === "start" && (
          <div
            className="absolute -top-10 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap border border-border"
            style={{ left: `${start}%` }}
          >
            {formatTimeInPercent(start, duration)}
          </div>
        )}

        {dragging === "end" && (
          <div
            className="absolute -top-10 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white whitespace-nowrap border border-border"
            style={{ left: `${finish}%` }}
          >
            {formatTimeInPercent(finish, duration)}
          </div>
        )}

        <div
          ref={barRef}
          className="relative w-full max-w-2xl bg-border h-[12px] rounded-full"
        >
          <div
            className={`absolute top-0 h-full rounded-full ${barColor} `}
            style={{
              left: `${start}%`,
              width: `${finish - start}%`,
            }}
          />

          <div
            onMouseDown={startDrag}
            className={`absolute flex items-center justify-center cursor-pointer 
            hover:scale-125 hover:shadow-xl
            aspect-square w-5 h-5 
            ${barColor} 
             rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2`}
            style={{
              left: `${start}%`,
            }}
          >
          </div>

          <div
            onMouseDown={endDrag}
            className={`absolute flex items-center justify-center cursor-pointer
             hover:scale-125 hover:shadow-xl
             aspect-square w-5 h-5  
             ${barColor} 
             rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2`}
            style={{
              left: `${finish}%`,
            }}
          >
          </div>
        </div>
      <div className="absolute  h-[12px] translate-y-2 top-full right-0 select-none">{formatTimeInPercent(finish, duration)}</div>

      </div>

    </div>
  );
}
import { useCallback, useEffect, useRef, useState } from "react";
import { formatTimeInPercent } from "../../../common/UXUtils";
type Props = {
  start: number;
  end: number;
  duration: number;
  color?: string;
  startCallback: (start: number) => void;
  endCallback: (end: number) => void;
};

export function SliderBar({
  start,
  color,
  end,
  duration,
  startCallback,
  endCallback,
}: Props) {
  const [dragging, setDragging] = useState<"start" | "end" | null>(null);

  const barReference = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(() => {
    setDragging("start");
  }, []);
  const endDrag = useCallback(() => {
    setDragging("end");
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging || !barReference.current) return;

      const boundingRect = barReference.current.getBoundingClientRect();

      let percent =
        ((e.clientX - boundingRect.left) / boundingRect.width) * 100;
      percent = Math.max(0, Math.min(percent, 100));

      if (dragging === "start") {
        startCallback(Math.min(percent, end - 1));
      } else if (dragging === "end") {
        endCallback(Math.max(start + 1, percent));
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
  }, [dragging, start, end, startCallback, endCallback]);

  let barColor = color ? `bg-${color}` : "bg-spotifyGreen";

  const fillWidth = end - start;

  return (
    <div className="flex flex-col w-full max-w-2xl select-none">
      <div className="relative">
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
            style={{ left: `${end}%` }}
          >
            {formatTimeInPercent(end, duration)}
          </div>
        )}

        {/* bar */}
        <div
          ref={barReference}
          className="relative w-full h-[12px] bg-gray-800 rounded-full"
        >
          {/* left */}

          <div
            onMouseDown={startDrag}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 w-5 h-5  ${barColor} rounded-full
          hover:scale-[1.10] hover:shadow-xl cursor-pointer`}
            style={{ left: `${start}%` }}
          />

          {/* fill */}
          <div
            className={`${barColor} absolute h-[12px] rounded-full`}
            style={{ width: `${fillWidth}%`, left: `${start}%` }}
          />

          {/* right */}

          <div
            onMouseDown={endDrag}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2  w-5 h-5 ${barColor} rounded-full
          hover:scale-[1.10] hover:shadow-xl cursor-pointer`}
            style={{ left: `${end}%` }}
          />
        </div>
        <div className="absolute  h-[12px] translate-y-2 top-full right-0 select-none">
          {formatTimeInPercent(end, duration)}
        </div>

                <div className="absolute  h-[12px] translate-y-2 top-full left-0 select-none">
          {formatTimeInPercent(start, duration)}
        </div>
      </div>
    </div>
  );
}

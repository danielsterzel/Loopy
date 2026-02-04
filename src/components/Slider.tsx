import { useRef, useState } from "react";
import styles from "./styleModules/Slider.module.css"

type SliderProps = {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
};

export function Slider({
  min = 0,
  max = 100,
  value: controlledValue, // if parent gives value use that if not use internal
  onChange,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null); // take real element of DOM
  const [internalValue, setInternalValue] = useState(min);

  const value = controlledValue ?? internalValue; // if someone steers use his otherwise do yo thing
  const percent = ((value - min) / (max - min)) * 100;

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newValue = Math.round(min + (x / rect.width) * (max - min));
    
    // clientX mouse position on viewport left = 0 and value rises
    // clientX - rect.left -- mouse postition in relation to tracker
    // Math.max(.., 0) dont allow to go over the left side
    // Math.min dont allow to go over the right side


    // x / rect.width -- slide proportions.
    // max - min -- range of the slider

    setInternalValue(newValue);
    onChange?.(Math.round(newValue));
  };

  return (
    <div
      ref={trackRef}
      className={styles.slider}
      onMouseDown={(e) => updateValue(e.clientX)}
      onMouseMove={(e) => e.buttons === 1 && updateValue(e.clientX)} // if mouse move and left
      // button update value
    >
      <div className={styles.sliderTrack} />
      <div className={styles.sliderFill} style={{ width: `${percent}%` }} />
      <div className={styles.sliderThumb} style={{ left: `${percent}%` }} />
    </div>
  );
}

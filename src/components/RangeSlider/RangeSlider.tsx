import styles from "./RangeSlider.module.scss"
import { useEffect, useRef, useState } from "react";

interface IProps {
  onSlideStarted: () => void;
  onSlideEnded: () => void;
  onPositionUpdated: (value: number) => void;
  maxValue?: number;
  minValue?: number;
  value?: number;
}

function RangeSlider({ onSlideEnded, onSlideStarted, onPositionUpdated, maxValue = 0, minValue = 0, value = 0 }: IProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [ isActive, setIsActive ] = useState(false);
  const [ position, setPosition ] = useState(value);

  function calculatePosition(x: number): void {
    if (sliderRef.current == null) return;
    const sliderOffset = sliderRef.current.getBoundingClientRect().left;
    const sliderWidth = sliderRef.current.clientWidth;

    const posX = ((x - sliderOffset) / sliderWidth) * maxValue;
    const normalisedPosX = Math.min(maxValue, Math.max(minValue, posX));

    setPosition(normalisedPosX);
    onPositionUpdated(normalisedPosX);
    setFillWidth(normalisedPosX);
  }

  function setFillWidth(posX: number) {
    if (fillRef.current == null) return;

    fillRef.current.style.width = (posX / maxValue) * 100 + "%";
  }

  const mouseDownHandler = (event: MouseEvent): void => {
    console.log(sliderRef.current)
    if (sliderRef.current == null) return;
    if (!event.composedPath().includes(sliderRef.current)) return;

    setIsActive(true);
    calculatePosition(event.clientX);
    onSlideStarted();
  }

  const mouseMoveHandler = (event: MouseEvent): void => {
    if (!isActive) return;

    calculatePosition(event.clientX);
  }

  const mouseUpHandler = (): void => {
    if (!isActive) return;

    setIsActive(false);
    onSlideEnded();
  }

  useEffect(() => {
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    }
  }, [ position, isActive ]);

  const classIsActive = isActive ? styles.active : null;

  return (
    <div className={`${styles.rangeSlider} ${classIsActive}`} onMouseDown={() => { return false; }}>
      <div ref={sliderRef} className={styles.sliderWrapper}>
        <div className={styles.track}></div>
        <div ref={fillRef} className={styles.fill}></div>
      </div>
    </div>
  )
}

export default RangeSlider;

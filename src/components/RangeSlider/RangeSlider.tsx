import styles from "./RangeSlider.module.scss"
import { useEffect, useRef, useState } from "react";

interface IProps {
  onSlideStarted: () => void;
  onSlideEnded: () => void;
  onPositionUpdated: (posX: number) => void;
  maxValue?: number;
  minValue?: number;
}

function RangeSlider({ onSlideEnded, onSlideStarted, onPositionUpdated, maxValue = 0, minValue = 0 }: IProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [ isActive, setIsActive ] = useState(false);
  const [ position, setPosition ] = useState(0);

  function calculatePosition(x: number): void {
    if (sliderRef.current == null) return;
    const sliderOffset = sliderRef.current.getBoundingClientRect().left;
    const sliderWidth = sliderRef.current.clientWidth;

    const posX = ((x - sliderOffset) / sliderWidth) * maxValue;

    if (posX < minValue) {
      setPosition(minValue);
    }
    else if (posX > maxValue) {
      setPosition(maxValue)
    }
    else {
      setPosition(posX);
    }

    onPositionUpdated(posX);
    setFillWidth(posX);
  }

  function setFillWidth(posX: number) {
    if (fillRef.current == null) return;

    fillRef.current.style.width = (posX / maxValue) * 100 + "%";
  }

  const mouseDownHandler = (event: MouseEvent): void => {
    if (sliderRef.current == null) return;
    if (!event.composedPath().includes(sliderRef.current)) return;

    calculatePosition(event.clientX);
    setIsActive(true);
    onSlideStarted();
  }

  const mouseMoveHandler = (event: MouseEvent): void => {
    if (!isActive) return;

    calculatePosition(event.clientX);
  }

  const mouseUpHandler = (): void => {
    setIsActive(false);
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


  return (
    <div className={ styles.rangeSlider } onMouseDown={() => { return false; }}>
      <div ref={sliderRef} className={styles.sliderWrapper}>
        <div className={styles.track}></div>
        <div ref={fillRef} className={styles.fill}></div>
      </div>
    </div>
  )
}

export default RangeSlider;

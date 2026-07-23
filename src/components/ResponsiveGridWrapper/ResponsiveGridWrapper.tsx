import styles from "./ResponsiveGridWrapper.module.scss"
import { useResize } from "hooks/useResize";
import { ReactNode, useEffect, useRef, useState } from "react";

interface IProps {
  onColCountChanged?: (colCount: number) => void;
  children: ReactNode;
}

function ResponsiveGridWrapper({ onColCountChanged, children }: IProps) {
  const refGrid = useRef<HTMLDivElement>(null)
  const { addOnResize } = useResize();

  const [ colCount, setColCount ] = useState(0);

  function onResize() {
    const el = refGrid.current;
    if (el == null) {
      return;
    }

    let num = 2;
    const width = el.clientWidth;

    const arrSizes = [
      { width: 1800, num: 9 },
      { width: 1560, num: 8 },
      { width: 1356, num: 7 },
      { width: 1152, num: 6 },
      { width: 948, num: 5 },
      { width: 700, num: 4 },
      { width: 450, num: 3 },
    ];

    for (let i = 0; i < arrSizes.length; i++) {
      if (width > arrSizes[i].width) {
        num = arrSizes[i].num;
        break;
      }
    }

    setColCount(num);
    el.style.cssText = `--card-count: ${num}`;

    if (onColCountChanged != null) {
      onColCountChanged(num);
    }
  }

  useEffect(() => {
    const destructor = addOnResize(onResize);
    return () => destructor();
  }, [ ]);

  return (
    <div ref={refGrid} className={ styles.responsiveGridWrapper }>
      { children }
    </div>
  )
}

export default ResponsiveGridWrapper;

import { RefObject, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export function useStickyHeader(headerRef: RefObject<HTMLDivElement>, canStick: boolean): boolean {
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const [ isHeaderFixed, setIsHeaderFixed ] = useState(false);

  useEffect(() => {
    if (headerRef.current == null || !canStick) return;

    const top = headerRef.current.getBoundingClientRect().top;
    top <= 72 ? setIsHeaderFixed(true) : setIsHeaderFixed(false);
  }, [ scrollDistance ]);

  return isHeaderFixed;
}

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ETrackListLayoutType } from "./TrackList";
import { useResize } from "../../hooks/useResize";

interface ITrackListContext {
  colCount: number;
}

export const TrackListContext = createContext<ITrackListContext | null>(null);

export const useTrackListContext = () => {
  const context = useContext(TrackListContext);

  if (!context) throw new Error('useTrackListContext must be used within the context');

  return context;
}

interface IProps {
  children: ReactNode;
  layoutType: ETrackListLayoutType;
  isCompact: boolean;
  maxColCount: number;
}

export function TrackListProvider({ children, isCompact, maxColCount, layoutType }: IProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const { addOnResize } = useResize();

  const [ colCount, setColCount ] = useState(maxColCount);

  let isColDateHidden = false;
  let isColArtistHidden = false;
  let isColAlbumHidden = false;
  let isColPlaysHidden = false;


  function onResize(): void {
    const el = mainRef.current;
    if (el == null) return;

    const width = el.clientWidth;
    let count = 2;

    if (width > 980) { count = 6; }
    else if (width > 725) { count = 5; }
    else if (width > 510) { count = 4; }
    else if (width > 300) { count = 3; }

    setColCount(Math.min(count, maxColCount));
  }

  useEffect(() => {
    const destructor = addOnResize(onResize);
    return () => destructor();
  }, [ isCompact ]);


  const value: ITrackListContext = {
    colCount
  }

  return (
    <TrackListContext.Provider value={value}>
      <div ref={mainRef}>
        { children }
      </div>
    </TrackListContext.Provider>
  )
}
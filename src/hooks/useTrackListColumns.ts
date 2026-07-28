import { RefObject, useEffect, useState } from "react";
import { useResize } from "hooks/useResize";
import { ETrackListLayoutType } from "components/TrackList/TrackList.types";

interface IUseTrackListColumnsOptions {
  mainRef: RefObject<HTMLDivElement>;
  layoutType: ETrackListLayoutType;
  isCompact?: boolean;
  maxColCount: number;
}

interface IUseTrackListColumnsResult {
  colCount: number;
  isColDateHidden: boolean;
  isColAlbumHidden: boolean;
  isColArtistHidden: boolean;
  isColPlaysHidden: boolean;
}

export function useTrackListColumns({ mainRef, layoutType, isCompact, maxColCount }: IUseTrackListColumnsOptions): IUseTrackListColumnsResult {
  const { addOnResize } = useResize();
  const [ colCount, setColCount ] = useState(maxColCount);

  const [ isColDateHidden, setIsColDateHidden ] = useState(false);
  const [ isColAlbumHidden, setIsColAlbumHidden ] = useState(false);
  const [ isColArtistHidden, setIsColArtistHidden ] = useState(false);
  const [ isColPlaysHidden, setIsColPlaysHidden ] = useState(false);

  useEffect(() => {
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

    const destructor = addOnResize(onResize);
    return () => destructor();
  }, [ isCompact ]);

  useEffect(() => {
    setIsColDateHidden(false);
    setIsColArtistHidden(false);
    setIsColAlbumHidden(false);
    setIsColPlaysHidden(false);

    if (colCount < 6) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColDateHidden(true); }
      }
    }
    if (colCount < 5) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColArtistHidden(true) }
        else { setIsColDateHidden(true) }
      }
    }
    if (colCount < 4) {
      if (layoutType === ETrackListLayoutType.playlist) {
        if (isCompact) { setIsColAlbumHidden(true) }
        else { setIsColAlbumHidden(true) }
      }
      else if (layoutType === ETrackListLayoutType.album) {
        if (isCompact) { setIsColArtistHidden(true) }
      }
      else if (layoutType === ETrackListLayoutType.topTracks) {
        setIsColPlaysHidden(true);
      }
    }
  }, [ colCount ]);

  return { colCount, isColDateHidden, isColAlbumHidden, isColArtistHidden, isColPlaysHidden };
}

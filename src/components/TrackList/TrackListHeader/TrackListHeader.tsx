import styles from "./TrackListHeader.module.scss";
import { useTrackListContext } from "../TrackListContext";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import IconDuration from "../../Icons/IconDuration";
import TrackListGridWrapper from "../TrackListGridWrapper/TrackListGridWrapper";

interface IProps {
  canHeaderStick: boolean;
}
export default function TrackListHeader({ canHeaderStick }: IProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [ isHeaderFixed, setIsHeaderFixed ] = useState(false);
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);

  const { isColAlbumHidden, isColArtistHidden, isColPlaysHidden, isColDateHidden, layoutType, isCompact } = useTrackListContext();

  const elColNumber = layoutType !== "searchResults" ? (<div className={styles.colNumber}>#</div>) : null;
  const elColAlbum = layoutType === "playlist" && !isColAlbumHidden ? (<div className={styles.colAlbum}>Album</div>) : null;
  const elColDateAdded = layoutType === "playlist" && !isColDateHidden ? (<div className={styles.colDate}>Date added</div>) : null;
  const elColArtist = isCompact && !isColArtistHidden ? (<div className={styles.colArtist}>Artist</div>) : null;

  useEffect(() => {
    if (headerRef.current == null || !canHeaderStick) return;

    const top = headerRef.current.getBoundingClientRect().top
    setIsHeaderFixed(top <= 72);
  }, [ scrollDistance ]);

  return (
    <TrackListGridWrapper className={styles.trackListHeader}>
      {elColNumber}
      <div className={styles.colTitle}>Title</div>
      {elColArtist}
      {elColAlbum}
      {elColDateAdded}
      <div className={styles.colDuration}>
        <IconDuration/>
      </div>
    </TrackListGridWrapper>
  )
}
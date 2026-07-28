import styles from "./TrackList.module.scss";
import IconDuration from "components/Icons/IconDuration";
import { useRef } from "react";
import dayjs from "dayjs";
import { Virtuoso } from "react-virtuoso";
import { ITrackContainer } from "types/track";
import { useTrackListColumns } from "hooks/useTrackListColumns";
import { useStickyHeader } from "hooks/useStickyHeader";
import { useTrackSelection } from "hooks/useTrackSelection";
import { useScrollParentContext } from "context/ScrollParentContext";
import TrackItem from "./TrackItem";
import TrackItemShimmering from "./TrackItemShimmering";
import { ETrackListLayoutType, ITrackListProps } from "./TrackList.types";
import { getTrackContainers } from "./TrackList.utils";

export { ETrackListLayoutType };

const TRACK_ITEM_HEIGHT = 56;
const TRACK_ITEM_HEIGHT_COMPACT = 32;

function TrackList({ arrTrackContainer, arrTracks, layoutType, canHeaderStick = true, isCompact, onPlay, maxColCount = 6, isVirtualized = true }: ITrackListProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const isHeaderFixed = useStickyHeader(headerRef, canHeaderStick);
  const { selectedTrackId, toggleTrackSelection } = useTrackSelection();
  const { scrollParent } = useScrollParentContext();

  const { colCount, isColDateHidden, isColAlbumHidden, isColArtistHidden, isColPlaysHidden } = useTrackListColumns({
    mainRef,
    layoutType,
    isCompact,
    maxColCount,
  });

  const trackContainers = getTrackContainers(arrTrackContainer, arrTracks);

  const classColCount = (() => {
    if (colCount === 6) { return styles.col6; }
    if (colCount === 5) { return styles.col5; }
    if (colCount === 4) { return styles.col4; }
    if (colCount === 3) { return styles.col3 }
    return styles.col2;
  })();
  const classIsCompact = isCompact ? styles.compact : "";

  function renderTrackItem(trackContainer: ITrackContainer, index: number) {
    const track = trackContainer.track;
    const date = trackContainer.added_at.split("T")[0];
    const formattedDate = dayjs(date).format("MMM DD, YYYY");

    return (
      <TrackItem
        key={track.id}
        track={track}
        date={formattedDate}
        index={index + 1}
        layoutType={layoutType}
        isSelected={track.id === selectedTrackId}
        onSelect={toggleTrackSelection}
        isCompact={isCompact}
        onPlay={() => onPlay(index)}
        isColAlbumHidden={isColAlbumHidden}
        isColArtistHidden={isColArtistHidden}
        isColDateHidden={isColDateHidden}
        isColPlaysHidden={isColPlaysHidden}
      />
    );
  }

  const elListBody = (() => {
    if (trackContainers == null || trackContainers.length === 0) {
      return (
        <div className={styles.listBody}>
          { Array.from({ length: 8 }, (_, index) => <TrackItemShimmering key={index} />) }
        </div>
      );
    }

    // scrollParent is undefined until OverlayScrollbars initialises — Virtuoso needs it up front
    if (isVirtualized && scrollParent != null) {
      return (
        <Virtuoso
          className={styles.listBody}
          customScrollParent={scrollParent}
          data={trackContainers}
          computeItemKey={(index, trackContainer) => `${trackContainer.track.id}-${index}`}
          defaultItemHeight={isCompact ? TRACK_ITEM_HEIGHT_COMPACT : TRACK_ITEM_HEIGHT}
          overscan={800}
          itemContent={(index, trackContainer) => renderTrackItem(trackContainer, index)}
        />
      );
    }

    return (
      <div className={styles.listBody}>
        { trackContainers.map((trackContainer, index) => renderTrackItem(trackContainer, index)) }
      </div>
    );
  })()

  const elColNumber = layoutType !== "searchResults" ? (<div className={styles.colNumber}>#</div>) : null;
  const elColAlbum = layoutType === "playlist" && !isColAlbumHidden ? (<div className={styles.colAlbum}>Album</div>) : null;
  const elColDateAdded = layoutType === "playlist" && !isColDateHidden ? (<div className={styles.colDate}>Date added</div>) : null;
  const elColArtist = isCompact && !isColArtistHidden ? (<div className={styles.colArtist}>Artist</div>) : null;

  const trackListLayoutClass = (() => {
    if (layoutType === ETrackListLayoutType.playlist) { return styles.playlist; }
    if (layoutType === ETrackListLayoutType.album) { return styles.album; }
    if (layoutType === ETrackListLayoutType.topTracks) { return styles.topTracks; }
    if (layoutType === ETrackListLayoutType.searchResults) { return styles.searchResults; }
    return null
  })();

  const elHeader = layoutType === "topTracks" || layoutType === "searchResults" ? null : (
    <div ref={headerRef} className={`${styles.listHeader} ${styles.gridItem} ${isHeaderFixed ? styles.fixed : ""}`}>
      { elColNumber }
      <div className={styles.colTitle}>Title</div>
      { elColArtist }
      { elColAlbum }
      { elColDateAdded }
      <div className={styles.colDuration}>
        <IconDuration />
      </div>
    </div>
  );

  return (
    <div key={"key"} ref={mainRef} className={`${styles.trackList} ${trackListLayoutClass} ${classColCount} ${classIsCompact}`}>
      { elHeader }
      { elListBody }
    </div>
  );
}

export default TrackList;

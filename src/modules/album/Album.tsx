import styles from "./Album.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "api";
import TracklistHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { getFullDuration } from "utils/duration";
import moment from "moment";
import LikeButton from "components/LikeButton/LikeButton";
import AlbumContextMenu from "modules/album/components/AlbumContextMenu/AlbumContextMenu";
import TracklistViewContextMenu from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";
import { usePlayer } from "hooks/usePlayer";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";

import { useQuery } from "react-query";
import AlbumRelatedItems from "./components/AlbumRelatedItems/AlbumRelatedItems";

function Album() {
  const [ isCompact, setIsCompact ] = useState(false);
  const { id } = useParams();
  const { playContext } = usePlayer();

  const { data: album } = useQuery({
    queryKey: [ "fetchAlbum", id ],
    queryFn: async () => {
      return await api.albums.getAlbum({ albumId: id as string });
    }
  });

  if (album == null) return null;

  const headerOptions: ITrackListHeaderOptions = {
    id: album.id,
    imageUrl: album.images[0].url,
    image: album.images[0],
    type: album.album_type,
    title: album.name,
    totalTracks: album.tracks.items.length,
    duration: getFullDuration(album.tracks.items),
    artists: album.artists,
  }

  const formattedDate = moment(album.release_date).format("MMMM D, yyyy");
  const elCopyright = (<ul className={styles.copyrights}>{
    album.copyrights.map((copyright, index) => (
      <li key={index}>
        { copyright.type === "C" ? "©" : "©" } { copyright.text }
      </li>
    ))
  }</ul>);

  async function onPlayTrack(index: number): Promise<void> {
    if (album == null) return;

    await playContext(album.uri, index);
  }

  return (
    <div className={styles.album}>
      <TracklistHeader options={headerOptions} />

      <div className={styles.albumBody}>
        <div className={styles.albumControls}>
          <ContextPlayButton uri={album.uri} />
          <LikeButton data={album} />
          <AlbumContextMenu />

          <div className={styles.viewSelector}>
            <TracklistViewContextMenu onViewChanged={setIsCompact} />
          </div>
        </div>

        <TrackList
          layoutType={ETrackListLayoutType.album}
          arrTracks={album.tracks.items}
          isCompact={isCompact}
          onPlay={onPlayTrack}
          maxColCount={isCompact ? 4 : 3}
        />

        <div className={styles.albumInfo}>
          <p className={styles.releaseDate}>{ formattedDate }</p>
          { elCopyright }
        </div>

        <AlbumRelatedItems album={album} />
      </div>
    </div>
  );
}

export default Album;

import styles from "./Playlist.module.scss";
import { useEffect, useState } from "react";
import { IPlaylist } from "types/playlist";
import { api } from "api";
import { usePlayer } from "hooks/usePlayer";
import { useParams } from 'react-router-dom';
import { getFullDuration } from "utils/duration";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import TrackListHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import PlaylistContextMenu from "modules/playlist/components/PlaylistContextMenu/PlaylistContextMenu";
import LikeButton from "components/LikeButton/LikeButton";
import TracklistViewContextMenu from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";

import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";

function Playlist() {
  const [ playlist, setPlaylist ] = useState<IPlaylist>();
  const [ isCompact, setIsCompact ] = useState(false);
  const { id } = useParams();
  const { playContext } = usePlayer();

  useEffect(() => {
    (async () => {
      const response = await api.playlist.fetchPlaylist({ playlistId: id as string });
      setPlaylist(response);
    })();
  }, [ id ]);

  if (playlist == null) return null;

  async function onPlayTrack(index: number): Promise<void> {
    if (playlist == null) return;

    await playContext(playlist.uri, index)
  }

  const headerOptions: ITrackListHeaderOptions = {
    id: playlist.id,
    imageUrl: playlist.images[0].url,
    image: playlist.images[0],
    title: playlist.name,
    owner: playlist.owner,
    totalTracks: playlist.tracks.total,
    description: playlist.description,
    type: playlist.type,
    duration: getFullDuration(playlist.tracks.items.map(item => item.track)),
  }

  return (
    <div className={styles.playlist}>
      <TrackListHeader options={headerOptions} />
      <div className={styles.playlistBody}>
        <div className={styles.playlistControls}>
          <ContextPlayButton uri={playlist.uri} />
          <LikeButton data={playlist} />
          <PlaylistContextMenu playlist={playlist} />

          <div className={styles.viewSelector}>
            <TracklistViewContextMenu onViewChanged={setIsCompact} />
          </div>
        </div>

        <TrackList
          layoutType={ETrackListLayoutType.playlist}
          arrTrackContainer={playlist?.tracks.items}
          isCompact={isCompact}
          onPlay={onPlayTrack}
          maxColCount={isCompact ? 6 : 5}
        />
      </div>
    </div>
  )
}

export default Playlist;

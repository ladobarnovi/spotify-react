import styles from "./Playlist.module.scss";
import { useState } from "react";
import { api } from "api";
import { usePlayer } from "hooks/usePlayer";
import { usePlaylistTracks } from "hooks/usePlaylistTracks";
import { useParams } from 'react-router-dom';
import { getFullDuration } from "utils/duration";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import TrackListHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import PlaylistContextMenu from "modules/playlist/components/PlaylistContextMenu/PlaylistContextMenu";
import LikeButton from "components/LikeButton/LikeButton";
import TracklistViewContextMenu from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";

import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import { useQuery } from "react-query";
import { IPlaylist } from "types/playlist";

function Playlist() {
  const [ isCompact, setIsCompact ] = useState(false);
  const { id } = useParams();
  const { playContext } = usePlayer();

  const { data: playlist } = useQuery({
    queryKey: [ "fetchPlaylist", id ],
    queryFn: async () => await api.playlist.fetchPlaylist({ playlistId: id as string })
  })

  const { mainRef, arrTracks } = usePlaylistTracks(playlist);

  if (playlist == null) return null;

  async function onPlayTrack(index: number): Promise<void> {
    if (playlist == null) return;

    await playContext(playlist.uri, index)
  }

  const headerOptions = buildPlaylistHeaderOptions(playlist);

  return (
    <div ref={mainRef} className={styles.playlist}>
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
          key={playlist.id}
          layoutType={ETrackListLayoutType.playlist}
          arrTrackContainer={arrTracks}
          isCompact={isCompact}
          onPlay={onPlayTrack}
          maxColCount={4}
        />
      </div>
    </div>
  )
}

function buildPlaylistHeaderOptions(playlist: IPlaylist): ITrackListHeaderOptions {
  return {
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
}

export default Playlist;

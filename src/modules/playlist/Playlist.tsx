import styles from "./Playlist.module.scss";
import { useEffect, useState } from "react";
import { IPlaylist } from "types/playlist";
import { api } from "api";
import { useParams } from 'react-router-dom';
import TrackList from "components/TrackList/TrackList";
import PlayButton from "components/PlayButton/PlayButton";
import TrackListHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import { getFullDuration } from "utils/duration";
import PlaylistContextMenu from "modules/playlist/components/PlaylistContextMenu/PlaylistContextMenu";
import LikeButton from "components/LikeButton/LikeButton";
import TracklistViewContextMenu, { ETracklistViewType } from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";

function Playlist() {
  const [ playlist, setPlaylist ] = useState<IPlaylist>();
  const [ viewType, setViewType ] = useState(ETracklistViewType.list);
  const [ layoutType, setLayoutType ] = useState("playlist");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await api.playlist.fetchPlaylist({ playlistId: id as string });
      setPlaylist(response);
    })();
  }, [ id ]);

  if (playlist == null) return null;

  const headerOptions: ITrackListHeaderOptions = {
    id: playlist.id,
    imageUrl: playlist.images[0].url,
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
          <PlayButton />
          <LikeButton data={playlist} />
          <PlaylistContextMenu playlist={playlist} />

          <div className={styles.viewSelector}>
            <TracklistViewContextMenu onViewChanged={() => {}} />
          </div>
        </div>

        <TrackList layoutType={"playlist"} arrTrackContainer={ playlist?.tracks.items } />
      </div>
    </div>
  )
}

export default Playlist;

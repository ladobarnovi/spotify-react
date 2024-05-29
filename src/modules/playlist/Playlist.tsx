import styles from "./Playlist.module.scss";
import { useEffect, useRef, useState } from "react";
import { api } from "api";
import { usePlayer } from "hooks/usePlayer";
import { useParams } from 'react-router-dom';
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import PlaylistContextMenu from "modules/playlist/components/PlaylistContextMenu/PlaylistContextMenu";
import LikeButton from "components/LikeButton/LikeButton";
import TracklistViewContextMenu from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";

import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import { useInfiniteQuery, useQuery } from "react-query";
import { ITrackContainer } from "types/track";
import { useSelector } from "react-redux";
import { RootState } from "store";
import PlaylistHeader from "./components/PlaylistHeader/PlaylistHeader";

export default function Playlist() {
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const [ isCompact, setIsCompact ] = useState(false);
  const { id } = useParams();
  const { playContext } = usePlayer();
  const mainRef = useRef<HTMLDivElement>(null);

  const { data: playlist } = useQuery({
    queryKey: [ "fetchPlaylist", id ],
    queryFn: async () => await api.playlist.fetchPlaylist({ playlistId: id as string })
  })

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: [ "fetchPlaylistTracks" ],
    queryFn: async ({ pageParam = 0 }) => {
      return await api.playlist.fetchPlaylistTracks({
        playlistId: playlist!.id,
        offset: pageParam,
      })
    },
    getNextPageParam: (lastPage, allPages) => {
      const offset = lastPage.offset + lastPage.limit;
      return offset > lastPage.total ? null : offset;
    },
    enabled: !!playlist
  })

  useEffect(() => {
    if (mainRef.current == null) return;

    const clientRect = mainRef.current.getBoundingClientRect();
    const componentHeight = clientRect.height;
    const isThresholdReached = scrollDistance > componentHeight - window.outerHeight;

    if (isThresholdReached && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [ scrollDistance ]);

  if (playlist == null) return null;

  const arrTracks: ITrackContainer[] = [];
  data?.pages.forEach(page => arrTracks.push(...page.items))

  async function onPlayTrack(index: number): Promise<void> {
    if (playlist == null) return;

    await playContext(playlist.uri, index)
  }

  return (
    <div ref={mainRef} className={styles.playlist}>
      <PlaylistHeader playlist={playlist} />
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
          maxColCount={isCompact ? 6 : 5}
        />
      </div>
    </div>
  )
}

import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import { api } from "api";
import { RootState } from "store";
import { ITrackContainer } from "types/track";
import { IPlaylist } from "types/playlist";

export function usePlaylistTracks(playlist: IPlaylist | undefined) {
  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const mainRef = useRef<HTMLDivElement>(null);

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

  const arrTracks = useMemo(() => {
    const tracks: ITrackContainer[] = [];
    data?.pages.forEach(page => tracks.push(...page.items));
    return tracks;
  }, [ data ]);

  return { mainRef, arrTracks, isFetching };
}

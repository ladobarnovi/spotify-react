import styles from "./DiscographyListItem.module.scss"
import { IAlbum } from "types/album";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { ITrackContainer } from "types/track";
import { useEffect, useRef, useState } from "react";
import { api } from "api";
import { useQuery } from "react-query";
import { usePlayer } from "hooks/usePlayer";
import DiscographyListItemHeader
  from "modules/artist/discography/DiscographyListView/DiscographyListItem/DiscographyListItemHeader/DiscographyListItemHeader";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface IProps {
  album: IAlbum;
}

function DiscographyListItem({ album }: IProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [ canLoad, setCanLoad ] = useState(false);

  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);
  const { playContext } = usePlayer();

  const { data: arrTrackContainers } = useQuery({
    queryKey: [ "fetchAlbum", album.id ],
    queryFn: async () => {
      const albumResponse = await api.albums.GetAlbum({ albumId: album.id });
      return albumResponse.tracks.items.map((track): ITrackContainer => ({
        added_at: "",
        track,
      }));
    },
    enabled: canLoad,
  });

  useEffect(() => {
    if (mainRef.current == null) return;

    const top = mainRef.current.getBoundingClientRect().top;

    if (Math.abs(top - scrollDistance) < 600 && !canLoad) {
      setCanLoad(true);
    }
  }, [ scrollDistance ])

  async function onPlay(index: number): Promise<void> {
    await playContext(album.uri, index);
  }

  return (
    <div ref={mainRef} className={ styles.discographyListItem }>
      <DiscographyListItemHeader album={album} />

      <TrackList
        arrTrackContainer={arrTrackContainers ?? null}
        layoutType={ETrackListLayoutType.album}
        canHeaderStick={false}
        onPlay={onPlay}
        maxColCount={3}
      />
    </div>
  )
}

export default DiscographyListItem;

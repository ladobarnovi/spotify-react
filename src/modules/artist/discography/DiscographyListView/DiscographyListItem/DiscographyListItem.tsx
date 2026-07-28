import styles from "./DiscographyListItem.module.scss"
import { IAlbum } from "types/album";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { ITrackContainer } from "types/track";
import { api } from "api";
import { useQuery } from "react-query";
import { usePlayer } from "hooks/usePlayer";
import DiscographyListItemHeader
  from "modules/artist/discography/DiscographyListView/DiscographyListItem/DiscographyListItemHeader/DiscographyListItemHeader";

interface IProps {
  album: IAlbum;
}

function DiscographyListItem({ album }: IProps) {
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
  });

  async function onPlay(index: number): Promise<void> {
    await playContext(album.uri, index);
  }

  return (
    <div className={ styles.discographyListItem }>
      <DiscographyListItemHeader album={album} />

      <TrackList
        arrTrackContainer={arrTrackContainers ?? null}
        layoutType={ETrackListLayoutType.album}
        canHeaderStick={false}
        onPlay={onPlay}
        maxColCount={3}
        isVirtualized={false}
      />
    </div>
  )
}

export default DiscographyListItem;

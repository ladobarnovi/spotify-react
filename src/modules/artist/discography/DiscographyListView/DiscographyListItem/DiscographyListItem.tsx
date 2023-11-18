import styles from "./DiscographyListItem.module.scss"
import { IAlbum } from "types/album";
import TrackList from "components/TrackList/TrackList";
import { ITrackContainer } from "types/track";
import { useEffect, useRef, useState } from "react";
import { api } from "api";
import DiscographyListItemHeader
  from "modules/artist/discography/DiscographyListView/DiscographyListItem/DiscographyListItemHeader/DiscographyListItemHeader";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface IProps {
  album: IAlbum;
}

function DiscographyListItem({ album }: IProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [ arrTrackContainers, setArrTrackContainers ] = useState<ITrackContainer[]|null>(null);
  const [ canLoad, setCanLoad ] = useState(false);

  const scrollDistance = useSelector((state: RootState) => state.globalReducer.scrollDistance);

  useEffect(() => {
    (async () => {
      if (!canLoad) return;

      const albumResponse = await api.albums.getAlbum({ albumId: album.id });
      setArrTrackContainers(albumResponse.tracks.items.map((track) => ({
        added_at: "",
        track,
      })));
    })()
  }, [ canLoad ]);

  useEffect(() => {
    if (mainRef.current == null) return;

    const top = mainRef.current.getBoundingClientRect().top;

    if (Math.abs(top - scrollDistance) < 600 && !canLoad) {
      setCanLoad(true);
    }
  }, [ scrollDistance ])



  return (
    <div ref={mainRef} className={ styles.discographyListItem }>
      <DiscographyListItemHeader album={album} />

      <TrackList
        arrTrackContainer={arrTrackContainers}
        layoutType={"album"}
        canHeaderStick={false}
      />
    </div>
  )
}

export default DiscographyListItem;

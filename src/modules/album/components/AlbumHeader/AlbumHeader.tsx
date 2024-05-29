import styles from "./AlbumHeader.module.scss";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";
import { IAlbum } from "types/album";
import ArtistList from "components/ArtistList/ArtistList";
import { getFullDuration } from "utils/duration";

interface IProps {
  album: IAlbum;
}
export default function AlbumHeader({ album }: IProps) {
  const duration = getFullDuration(album.tracks.items)

  return (
    <EntityHeaderWrapper
      image={album.images[0]}
      title={album.name}
      type={album.type}
    >
      <div className={styles.additionalInfo}>
        <ArtistList artists={album.artists}/>
        <span>•</span>
        <span>{album.tracks.total} songs,</span>
        <span>{duration}</span>
      </div>
    </EntityHeaderWrapper>
  )
}
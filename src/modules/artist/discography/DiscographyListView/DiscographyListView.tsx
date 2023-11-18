import styles from "./DiscographyListView.module.scss"
import { IAlbum } from "types/album";
import DiscographyListItem
  from "modules/artist/discography/DiscographyListView/DiscographyListItem/DiscographyListItem";

interface IProps {
  arrAlbums: IAlbum[];
}

function DiscographyListView({ arrAlbums }: IProps) {
  const elItems = arrAlbums.map((album) => (
    <DiscographyListItem album={album} />
  ));

  return (
    <div className={ styles.discographyListView }>
      { elItems }
    </div>
  )
}

export default DiscographyListView;

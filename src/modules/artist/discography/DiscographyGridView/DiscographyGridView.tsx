import styles from "./DiscographyGridView.module.scss"
import { IAlbum } from "types/album";
import EntityCard, { ICardOptions } from "components/EntityCard/EntityCard";

interface IProps {
  arrAlbums: IAlbum[];
}

function DiscographyGridView({ arrAlbums }: IProps) {
  const cardOptions: ICardOptions = {
    album: {
      showReleaseYear: true,
      showType: true,
    }
  };

  const elCards = arrAlbums.map(album => (
    <EntityCard data={album} options={cardOptions} />
  ));

  return (
    <div className={ styles.discographyGridView }>
      { elCards }
    </div>
  )
}

export default DiscographyGridView;

import styles from "./DiscographyListView.module.scss"
import { IAlbum } from "types/album";
import { Virtuoso } from "react-virtuoso";
import DiscographyListItem
  from "modules/artist/discography/DiscographyListView/DiscographyListItem/DiscographyListItem";
import { useScrollParentContext } from "context/ScrollParentContext";

interface IProps {
  arrAlbums: IAlbum[];
}

function DiscographyListView({ arrAlbums }: IProps) {
  const { scrollParent } = useScrollParentContext();

  return (
    <div className={ styles.discographyListView }>
      <Virtuoso
        customScrollParent={scrollParent}
        data={arrAlbums}
        computeItemKey={(index, album) => album.id}
        overscan={800}
        itemContent={(index, album) => <DiscographyListItem album={album} />}
      />
    </div>
  )
}

export default DiscographyListView;

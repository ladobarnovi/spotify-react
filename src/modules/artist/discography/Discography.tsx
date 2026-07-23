import styles from "./Discography.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "api";
import { EAlbumType, IAlbum } from "types/album";
import DiscographyHeader, { EDiscographyLayoutTypes } from "modules/artist/discography/DiscographyHeader/DiscographyHeader";
import DiscographyListView from "modules/artist/discography/DiscographyListView/DiscographyListView";
import DiscographyGridView from "modules/artist/discography/DiscographyGridView/DiscographyGridView";

function Discography() {
  const { id } = useParams();
  const [ arrFilteredAlbums, setArrFilteredAlbums ] = useState<IAlbum[]>([])
  const [ layoutType, setLayoutType ] = useState<EDiscographyLayoutTypes>(EDiscographyLayoutTypes.grid);
  const [ albumType, setAlbumType ] = useState(EAlbumType.all);

  const { data: artist } = useQuery({
    queryKey: [ "fetchArtist", id ],
    queryFn: async () => await api.artists.GetArtist({ artistId: id as string })
  })

  const { data: arrAlbums } = useQuery({
    queryKey: [ "artistDiscography", id ],
    queryFn: async () => (await api.artists.GetArtistsAlbums({ artistId: id as string })).items
  })


  useEffect(() => {
    if (arrAlbums == null) return;

    if (albumType === EAlbumType.all) {
      setArrFilteredAlbums(arrAlbums);
    }
    else {
      setArrFilteredAlbums(arrAlbums.filter((album) => (
        album.album_type === albumType
      )));
    }
  }, [ albumType, arrAlbums ])

  if (artist == null) return null;

  const elView = (() => {
    if (layoutType === EDiscographyLayoutTypes.list) {
      return <DiscographyListView arrAlbums={arrFilteredAlbums} />
    }
    else if (layoutType === EDiscographyLayoutTypes.grid) {
      return <DiscographyGridView arrAlbums={arrFilteredAlbums} />
    }

    return null;
  })();

  return (
    <div className={styles.discography}>
      <DiscographyHeader
        name={artist.name}
        layoutType={layoutType}
        onLayoutChanged={setLayoutType}
        onAlbumTypeChanged={setAlbumType}
      />

      { elView }
    </div>
  )
}

export default Discography;

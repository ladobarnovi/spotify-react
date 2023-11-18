import styles from "./Discography.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IArtist } from "types/artist";
import { api } from "api";
import { IAlbum } from "types/album";
import DiscographyHeader, { EDiscographyLayoutTypes } from "modules/artist/discography/DiscographyHeader/DiscographyHeader";
import DiscographyListView from "modules/artist/discography/DiscographyListView/DiscographyListView";
import { albums } from "api/album";
import DiscographyGridView from "modules/artist/discography/DiscographyGridView/DiscographyGridView";

function Discography() {
  const { id } = useParams();
  const [ artist, setArtist ] = useState<IArtist>();
  const [ arrAlbums, setArrAlbums ] = useState<IAlbum[]>([])
  const [ layoutType, setLayoutType ] = useState<EDiscographyLayoutTypes>(EDiscographyLayoutTypes.grid);

  async function fetchArtistInfo() {
    const response = await api.artists.getArtist({ artistId: id as string })
    setArtist(response);
  }

  async function fetchArtistAlbums() {
    const response = await api.artists.albums({ artistId: id as string });
    setArrAlbums(response.items);
  }

  function onLayoutChanged(type: EDiscographyLayoutTypes) {
    setLayoutType(type);
  }

  useEffect(() => {
    fetchArtistInfo();
    fetchArtistAlbums();
  }, [ ])

  if (artist == null) return null;

  const elView = (() => {
    if (layoutType === EDiscographyLayoutTypes.list) {
      return <DiscographyListView arrAlbums={arrAlbums} />
    }
    else if (layoutType === EDiscographyLayoutTypes.grid) {
      return <DiscographyGridView arrAlbums={arrAlbums} />
    }

    return null;
  })();

  return (
    <div className={styles.discography}>
      <DiscographyHeader
        name={artist.name}
        layoutType={layoutType}
        onLayoutChanged={onLayoutChanged}
      />

      { elView }
    </div>
  )
}

export default Discography;

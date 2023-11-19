import styles from "./Album.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum } from "types/album";
import { api } from "api";
import TracklistHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import PlayButton from "components/PlayButton/PlayButton";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { ITrackContainer } from "types/track";
import { getFullDuration } from "utils/duration";
import moment from "moment";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { ICardOptions } from "components/EntityCard/EntityCard";
import LikeButton from "components/LikeButton/LikeButton";
import AlbumContextMenu from "modules/album/components/AlbumContextMenu/AlbumContextMenu";

function Album() {
  const [ album, setAlbum ] = useState<IAlbum>();
  const [ arrRelatedAlbums, setArrRelatedAlbums ] = useState<IAlbum[]>([ ])
  const { id } = useParams();

  async function fetchCurrentAlbum() {
    const response = await api.albums.getAlbum({ albumId: id as string });
    setAlbum(response);
  }

  async function fetchRelatedAlbums() {
    const response = await api.artists.albums({ artistId: album?.artists[0].id as string })
    setArrRelatedAlbums(response.items)
  }

  useEffect(() => {
    (async () => {
      await fetchCurrentAlbum()
      await fetchRelatedAlbums();
    })()
  }, [ id ])

  if (album == null) return null;

  const headerOptions: ITrackListHeaderOptions = {
    id: album.id,
    imageUrl: album.images[0].url,
    type: album.album_type,
    title: album.name,
    totalTracks: album.tracks.items.length,
    duration: getFullDuration(album.tracks.items),
    artists: album.artists,
  }

  const arrTrackContainer: ITrackContainer[] = album.tracks.items.map((track) => ({
    added_at: "",
    track,
  }));

  const formattedDate = moment(album.release_date).format("MMMM D, yyyy");
  const elCopyright = <ul className={styles.copyrights}>{
    album.copyrights.map((copyright, index) => (
      <li key={index}>
        { copyright.type === "C" ? "©" : "©" } { copyright.text }
      </li>
    ))
  }</ul>
  const cardsRowOptions: ICardOptions = {
    album: {
      showReleaseYear: true,
    }
  }

  return (
    <div className={styles.album}>
      <TracklistHeader options={headerOptions} />

      <div className={styles.albumBody}>
        <div className={styles.albumControls}>
          <PlayButton />
          <LikeButton data={album} />
          <AlbumContextMenu />
        </div>

        <TrackList layoutType={ETrackListLayoutType.album} arrTrackContainer={arrTrackContainer} />

        <div className={styles.albumInfo}>
          <p className={styles.releaseDate}>{ formattedDate }</p>
          { elCopyright }
        </div>

        <CardsRow
          title={`More by ${album.artists[0].name}`}
          arrData={arrRelatedAlbums}
          options={cardsRowOptions}
        />
      </div>
    </div>
  );
}

export default Album;

import styles from "./Album.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum } from "types/album";
import { api } from "api";
import TracklistHeader, { ITrackListHeaderOptions } from "components/TrackList/TrackListHeader/TracklistHeader";
import TrackList, { ETrackListLayoutType } from "components/TrackList/TrackList";
import { getFullDuration } from "utils/duration";
import moment from "moment";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { ICardOptions } from "components/EntityCard/EntityCard";
import LikeButton from "components/LikeButton/LikeButton";
import AlbumContextMenu from "modules/album/components/AlbumContextMenu/AlbumContextMenu";
import TracklistViewContextMenu from "components/TrackList/TrackListViewContextMenu/TracklistViewContextMenu";
import { usePlayer } from "hooks/usePlayer";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";

function Album() {
  const [ album, setAlbum ] = useState<IAlbum>();
  const [ arrRelatedAlbums, setArrRelatedAlbums ] = useState<IAlbum[]>([ ])
  const [ isCompact, setIsCompact ] = useState(false);
  const { id } = useParams();
  const { playContext } = usePlayer();

  useEffect(() => {
    (async () => {
      const albumResponse = await api.albums.getAlbum({ albumId: id as string });
      const artistResponse = await api.artists.albums({ artistId: albumResponse.artists[0].id });
      setAlbum(albumResponse);
      setArrRelatedAlbums(artistResponse.items)
    })()
  }, [ id ])

  if (album == null) return null;

  const headerOptions: ITrackListHeaderOptions = {
    id: album.id,
    imageUrl: album.images[0].url,
    image: album.images[0],
    type: album.album_type,
    title: album.name,
    totalTracks: album.tracks.items.length,
    duration: getFullDuration(album.tracks.items),
    artists: album.artists,
  }

  const formattedDate = moment(album.release_date).format("MMMM D, yyyy");
  const elCopyright = (<ul className={styles.copyrights}>{
    album.copyrights.map((copyright, index) => (
      <li key={index}>
        { copyright.type === "C" ? "©" : "©" } { copyright.text }
      </li>
    ))
  }</ul>);

  const cardsRowOptions: ICardOptions = {
    album: {
      showReleaseYear: true,
    }
  };

  async function onPlayTrack(index: number): Promise<void> {
    if (album == null) return;

    await playContext(album.uri, index);
  }

  return (
    <div className={styles.album}>
      <TracklistHeader options={headerOptions} />

      <div className={styles.albumBody}>
        <div className={styles.albumControls}>
          <ContextPlayButton uri={album.uri} />
          <LikeButton data={album} />
          <AlbumContextMenu />

          <div className={styles.viewSelector}>
            <TracklistViewContextMenu onViewChanged={setIsCompact} />
          </div>
        </div>

        <TrackList
          layoutType={ETrackListLayoutType.album}
          arrTracks={album.tracks.items}
          isCompact={isCompact}
          onPlay={onPlayTrack}
          maxColCount={isCompact ? 4 : 3}
        />

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

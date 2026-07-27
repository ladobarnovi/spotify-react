import styles from "./Artist.module.scss";
import { api } from "api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ArtistHeader from "modules/artist/components/ArtistHeader/ArtistHeader";
import ContextPlayButton from "components/ContextPlayButton/ContextPlayButton";
import TopTracks from "modules/artist/components/TopTracks/TopTracks";
import ArtistDiscography from "modules/artist/components/ArtistDiscography/ArtistDiscography";
import FollowButton from "modules/artist/components/FollowButton/FollowButton";
import ArtistContextMenu from "modules/artist/components/ArtistContextMenu/ArtistContextMenu";
import ArtistRelatedItems from "./components/ArtistRelatedItems/ArtistRelatedItems";

function Artist() {
  const { id } = useParams();

  const { data: artist } = useQuery({
    queryKey: [ "fetchArtist", id ],
    queryFn: async () => {
      return await api.artists.GetArtist({ artistId: id as string })
    }
  })

  if (artist == null) return null;

  return (
    <div className={styles.artist}>
      <ArtistHeader artist={artist} />

      <div className={styles.artistBody}>
        <div className={styles.artistControls}>
          <ContextPlayButton uri={artist.uri} />
          <FollowButton entity={artist} />
          <ArtistContextMenu artist={artist} />
        </div>

        <TopTracks artistId={id as string} />
        <ArtistDiscography artistId={artist.id} />
        <ArtistRelatedItems artistId={id as string} />
      </div>
    </div>
  );
}

export default Artist;

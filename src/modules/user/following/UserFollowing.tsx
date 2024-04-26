import styles from "./UserFollowing.module.scss";
import { useQuery } from "react-query";
import { api } from "api";
import { useParams } from "react-router-dom";
import EntityGrid from "../../../components/EntityGrid/EntityGrid";

export default function UserFollowing() {
  const { userId } = useParams();

  const { data: arrArtists } = useQuery({
    queryKey: [ "fetchFollowedArtists", userId ],
    queryFn: async () => (await api.me.getFollowedArtists()).artists.items,
    enabled: !!userId
  });

  if (arrArtists == null) return <></>

  return (
    <div className={styles.userFollowing}>
      <p className={styles.title}>Following</p>

      <EntityGrid arrEntities={arrArtists} />
    </div>
  )
}
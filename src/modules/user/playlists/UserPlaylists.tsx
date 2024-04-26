import styles from "./UserPlaylists.module.scss";
import { useQuery } from "react-query";
import { api } from "api";
import { useParams } from "react-router-dom";
import EntityGrid from "../../../components/EntityGrid/EntityGrid";

export default function UserPlaylists() {
  const { userId } = useParams();

  const { data: arrUserPlaylists } = useQuery({
    queryKey: [ "fetchUserPlaylists", userId ],
    queryFn: async () => (await api.users.getUserPlaylists({ userId: userId as string })).items,
    enabled: !!userId
  });

  if (arrUserPlaylists == null) return <></>

  return (
    <div className={styles.userPlaylists}>
      <p className={styles.title}>Public Playlists</p>
      <EntityGrid arrEntities={arrUserPlaylists} />
    </div>
  )
}
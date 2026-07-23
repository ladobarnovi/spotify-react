import styles from "./User.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "api";
import UserHeader from "./components/UserHeader/UserHeader";
import UserPlaylistsRow from "./components/UserPlaylistsRow/UserPlaylistsRow";
import UserFollowedArtistsRow from "./components/UserFollowedArtistsRow/UserFollowedArtistsRow";

export default function User() {
  const { userId } = useParams();

  const { data: user } = useQuery({
    queryKey: [ "fetchUser", userId ],
    queryFn: async () => await api.users.GetUserProfile({ userId: userId as string }),
    enabled: !!userId,
  });

  if (user == null || userId == null) return null;

  return (
    <div className={styles.user}>
      <UserHeader user={user} />
      
      <main className={styles.body}>
        <UserPlaylistsRow userId={userId} />
        <UserFollowedArtistsRow userId={userId} />
      </main>
    </div>
  )
}
import styles from "./User.module.scss";
import { useParams } from "react-router-dom";
import EntityHeaderWrapper from "../../components/EntityHeaderWrapper/EntityHeaderWrapper";
import { useQuery } from "react-query";
import { api } from "../../api";
import CardsRow from "../../components/EntityCard/CardsRow/CardsRow";

export default function User() {
  const { id } = useParams();

  const { data: user } = useQuery({
    queryKey: [ "fetchUser", id ],
    queryFn: async () => await api.users.getUser({ userId: id as string }),
    enabled: !!id,
  });

  const { data: arrUserPlaylists } = useQuery({
    queryKey: [ "fetchUserPlaylists", id ],
    queryFn: async () => (await api.users.getUserPlaylists({ userId: id as string })).items,
    enabled: !!id,
  })

  if (!user) return null;

  console.log(arrUserPlaylists)
  return (
    <div className={styles.user}>
      <EntityHeaderWrapper
        image={user.images[1]}
        title={user.display_name}
        type={"Profile"}
        isImageRounded={true}
      ></EntityHeaderWrapper>
      
      <main className={styles.body}>
        <CardsRow title={"Public Playlists"} arrData={arrUserPlaylists || []} />
      </main>
    </div>
  )
}
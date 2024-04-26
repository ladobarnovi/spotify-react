
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { useQuery } from "react-query";
import { api } from "api";

interface IProps {
  userId: string;
}
export default function UserPlaylistsRow({ userId }: IProps) {
  const { data: arrUserPlaylists } = useQuery({
    queryKey: [ "fetchUserPlaylists", userId ],
    queryFn: async () => (await api.users.getUserPlaylists({ userId })).items,
    enabled: !!userId
  });

  if (arrUserPlaylists == null) return <></>;

  return (
    <CardsRow
      title={"Public Playlist"}
      arrData={arrUserPlaylists}
      url={`/user/${userId}/playlists`}
    />
  )
}
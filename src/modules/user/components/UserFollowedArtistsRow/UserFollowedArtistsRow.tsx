import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { useQuery } from "react-query";
import { api } from "api";

interface IProps {
  userId: string;
}
export default function UserFollowedArtistsRow({ userId }: IProps) {
  const { data: arrArtists } = useQuery({
    queryKey: [ "fetchFollowedArtists", userId ],
    queryFn: async () => (await api.me.GetFollowedArtists({ type: "artist" })).artists.items,
    enabled: !!userId
  });

  if (arrArtists == null) return <></>

  return (
    <CardsRow
      title={"Following"}
      arrData={arrArtists}
      url={`/user/${userId}/following`}
    />
  )
}
import { useQuery } from "react-query";
import { api } from "api";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { useEffect } from "react";

interface IProps {
  artistId: string;
}

function ArtistRelatedItems({ artistId }: IProps) {
  const { data: arrArtists } = useQuery({
    queryKey: [ "fetchRelatedArtists", artistId ],
    queryFn: async () => (await api.artists.GetArtistsRelatedArtists({ artistId })).artists
  });

  if (arrArtists == null) return null;

  return (
    <CardsRow
      title={"Fans also like"}
      arrData={arrArtists}
      url={`/artist/${artistId}/related`}
    />
  )
}

export default ArtistRelatedItems;
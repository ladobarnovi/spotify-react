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
    cacheTime: 0,
    queryFn: async () => {
      const response = await api.artists.relatedArtists({ artistId });
      return response.artists;
    }
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
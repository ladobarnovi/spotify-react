import { api } from "api";
import { IAlbum } from "types/album";
import { ICardOptions } from "components/EntityCard/EntityCard";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";

import { useQuery } from "react-query";

interface IProps {
  album: IAlbum
}

function AlbumRelatedItems({ album }: IProps) {
  const { data: arrRelatedAlbums } = useQuery({
    queryKey: [ "fetchRelatedAlbums", album.id ],
    cacheTime: 0,
    queryFn: async () => {
      const artistId = album.artists[0].id;
      const response = await api.artists.albums({ artistId });
      return response.items;
    }
  })

  const cardsRowOptions: ICardOptions = {
    album: {
      showReleaseYear: true,
    }
  };

  if (arrRelatedAlbums == null) return null;

  return (
    <CardsRow
      title={`More by ${album.artists[0].name}`}
      arrData={arrRelatedAlbums}
      options={cardsRowOptions}
    />
  )
}

export default AlbumRelatedItems;
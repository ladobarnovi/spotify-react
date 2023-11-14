import axios from "axios";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";
import { ITrack } from "types/track";

interface IArtistBaseRequest {
  artistId: string;
}

interface IArtistAlbumsRequest extends IArtistBaseRequest { }

interface IArtistAlbumsResponse {
  items: IAlbum[];
}

interface IGetArtistRequest extends IArtistBaseRequest { }
interface IGetArtistResponse extends IArtist { }

interface IGetArtistTopTracksRequest extends IArtistBaseRequest { }
interface IGetArtistTopTracksResponse {
  tracks: ITrack[];
}

interface IGetRelatedArtistsRequest extends IArtistBaseRequest { }
interface IGetRelatedArtistsResponse {
  artists: IArtist[];
}

export const artists = {
  getArtist: async ({ artistId }: IGetArtistRequest): Promise<IGetArtistResponse> => {
    const { data } = await axios.get(`/artists/${artistId}`);

    return data;
  },

  albums: async ({ artistId }: IArtistAlbumsRequest): Promise<IArtistAlbumsResponse> => {
    const { data } = await axios.get(`/artists/${artistId}/albums`);

    return data;
  },

  topTracks: async ({ artistId }: IGetArtistTopTracksRequest): Promise<IGetArtistTopTracksResponse> => {
    const { data } = await axios.get(`/artists/${artistId}/top-tracks`, {
      params: {
        market: "US"
      }
    });

    return data;
  },

  relatedArtists: async ({ artistId }: IGetRelatedArtistsRequest): Promise<IGetRelatedArtistsResponse> => {
    const { data } = await axios.get(`/artists/${artistId}/related-artists`);

    return data;
  },
}

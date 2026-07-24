import { IAlbum } from "types/album";
import axios from "axios";

interface IGetArtistAlbumsRequest {
  artistId: string;
  include_groups?: string;
  market?: string;
  limit?: number;
  offset?: number;
}

interface IGetArtistAlbumsResponse {
  items: IAlbum[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 */
export async function GetArtistsAlbums({ artistId, limit = 50, ...params }: IGetArtistAlbumsRequest): Promise<IGetArtistAlbumsResponse> {
  const { data } = await axios.get<IGetArtistAlbumsResponse>(`/artists/${artistId}/albums`, {
    params: { ...params, limit }
  });
  return data;
}
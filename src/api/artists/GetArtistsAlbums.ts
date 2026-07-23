import { IAlbum } from "types/album";
import axios from "axios";

interface IGetArtistAlbumsRequest {
  artistId: string
}

interface IGetArtistAlbumsResponse {
  items: IAlbum[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 */
export async function GetArtistsAlbums({ artistId }: IGetArtistAlbumsRequest): Promise<IGetArtistAlbumsResponse> {
  const { data } = await axios.get<IGetArtistAlbumsResponse>(`/artists/${artistId}/albums`);
  return data;
}
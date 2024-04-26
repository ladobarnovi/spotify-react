import axios from "axios";
import { IAlbum } from "types/album";

interface IAlbumsRequest {
  limit?: number;
  offset?: number;
  market?: string;
}

interface IAlbumsResponse {
  href: string;
  items: {
    album: IAlbum
  }[];
  total: number;
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
 */
export async function GetAlbums(params?: IAlbumsRequest): Promise<IAlbumsResponse> {
  const { data } = await axios.get<IAlbumsResponse>("/me/albums", {
    params
  });

  return data;
}
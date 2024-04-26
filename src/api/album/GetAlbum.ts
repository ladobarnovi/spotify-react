import { IAlbum } from "types/album";
import axios from "axios";

interface IGetAlbumRequest {
  albumId: string;
}

interface IGetAlbumResponse extends IAlbum { }

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */
export async function GetAlbum({ albumId }: IGetAlbumRequest): Promise<IGetAlbumResponse> {
  const { data } = await axios.get(`/albums/${albumId}`);
  return data;
}
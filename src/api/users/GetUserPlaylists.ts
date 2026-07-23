import { IPlaylist } from "types/playlist";
import axios from "axios";

interface IGetUserPlaylistsRequest { userId: string }
interface IGetUserPlaylistsResponse {
  total: number;
  offset: number;
  items: IPlaylist[];
}


/**
 * https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
 */
export async function GetUserPlaylists({ userId }: IGetUserPlaylistsRequest): Promise<IGetUserPlaylistsResponse> {
  const { data } = await axios.get<IGetUserPlaylistsResponse>(`/users/${userId}/playlists`)
  return data;
}
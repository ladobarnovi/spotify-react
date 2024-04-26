import { IPlaylist } from "types/playlist";
import axios from "axios";

interface IPlaylistsRequest {
  limit?: number;
  offset?: number;
}

interface IPlaylistResponse {
  href: string;
  items: IPlaylist[];
  total: number;
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 */
export async function GetPlaylists(params?: IPlaylistsRequest): Promise<IPlaylistResponse> {
  const { data } = await axios.get<IPlaylistResponse>("/me/playlists", {
    params
  });

  return data;
}
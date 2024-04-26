import { IPlaylist } from "types/playlist";
import axios from "axios";

interface IGetFeaturedPlaylistsResponse {
  message: string;
  playlists: {
    items: IPlaylist[];
  }
}


/**
 * https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
 */
export async function GetFeaturedPlaylists(): Promise<IGetFeaturedPlaylistsResponse> {
  const { data } = await axios.get<IGetFeaturedPlaylistsResponse>("/browse/featured-playlists")
  return data;
}
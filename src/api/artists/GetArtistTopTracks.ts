import { ITrack } from "types/track";
import axios from "axios";

interface IGetArtistTopTracksRequest {
  artistId: string;
}
interface IGetArtistTopTracksResponse {
  tracks: ITrack[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
 */
export async function GetArtistTopTracks({ artistId }: IGetArtistTopTracksRequest): Promise<IGetArtistTopTracksResponse> {
  const { data } = await axios.get<IGetArtistTopTracksResponse>(`/artists/${artistId}/top-tracks`);
  return data;
}
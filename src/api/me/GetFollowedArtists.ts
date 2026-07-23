import { IArtist } from "types/artist";
import axios from "axios";

interface IGetFollowedArtistsRequest {
  type: "artist";
  after?: string | null;
  limit?: number;
}

interface IGetFollowedArtistsResponse {
  artists: {
    items: IArtist[];
    total: number;
  }
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-followed
 */
export async function GetFollowedArtists(params: IGetFollowedArtistsRequest): Promise<IGetFollowedArtistsResponse> {
  const { data } = await axios.get<IGetFollowedArtistsResponse>("/me/following", {
    params
  });

  return data;
}
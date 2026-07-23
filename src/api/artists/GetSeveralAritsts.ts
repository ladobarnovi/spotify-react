import { IArtist } from "../../types/artist";
import axios from "axios";

interface IGetSeveralArtistsRequest {
  arrIds: string[];
}
interface IGetSeveralArtistsResponse {
  artists: IArtist[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
 */
export async function GetSeveralArtists({ arrIds }: IGetSeveralArtistsRequest): Promise<IGetSeveralArtistsResponse> {
  const { data } = await axios.get<IGetSeveralArtistsResponse>(`/artists?ids=${arrIds.join(",")}`);
  return data;
}
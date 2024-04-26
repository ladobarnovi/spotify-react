import axios from "axios";
import { IArtist } from "../../types/artist";


interface IGetArtistsRelatedArtistsRequest {
  artistId: string;
}
interface IGetArtistsRelatedArtistsResponse {
  artists: IArtist[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
 */
export async function GetArtistsRelatedArtists({ artistId }: IGetArtistsRelatedArtistsRequest): Promise<IGetArtistsRelatedArtistsResponse> {
  const { data } = await axios.get(`/artists/${artistId}/related-artists`);
  return data;
}
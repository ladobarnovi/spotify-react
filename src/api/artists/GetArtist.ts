import { IArtist } from "types/artist";
import axios from "axios";

interface IGetArtistRequest {
  artistId: string;
}
interface IGetArtistResponse extends IArtist { }

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export async function GetArtist({ artistId }: IGetArtistRequest): Promise<IGetArtistResponse> {
  const { data } = await axios.get(`/artists/${artistId}`);
  return data;
}
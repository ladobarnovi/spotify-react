import axios from "axios";
import { IPodcast } from "types/podcast";

interface IGetShowRequest {
  showId: string;
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-a-show
 */
export async function GetShow({ showId }: IGetShowRequest): Promise<IPodcast> {
  const { data } = await axios.get<IPodcast>(`/shows/${showId}`);
  return data;
}
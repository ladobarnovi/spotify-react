import { IEpisode } from "../../types/podcast";
import axios from "axios";

interface IGetShowEpisodesRequest {
  showId: string;
}
interface IGetShowEpisodesResponse {
  items: IEpisode[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes
 */
export async function GetShowEpisodes({ showId }: IGetShowEpisodesRequest): Promise<IGetShowEpisodesResponse> {
  const { data } = await axios.get<IGetShowEpisodesResponse>(`/shows/${showId}/episodes`);
  return data;
}
import { IEpisode } from "types/podcast";
import axios from "axios";

interface IGetEpisodeRequest {
  episodeId: string;
}

interface IGetEpisodeResponse extends IEpisode {}


/**
 * https://developer.spotify.com/documentation/web-api/reference/get-an-episode
 */
export async function GetEpisode({ episodeId }: IGetEpisodeRequest): Promise<IGetEpisodeResponse> {
  const { data } = await axios.get<IGetEpisodeResponse>(`/episodes/${episodeId}`);
  return data;
}
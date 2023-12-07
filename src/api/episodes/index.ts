import axios from "axios";
import { IEpisode } from "types/podcast";

interface IGetEpisodeRequest {
  episodeId: string;
}

interface IGetEpisodeResponse extends IEpisode {}

export const episodes = {
  getEpisode: async ({ episodeId }: IGetEpisodeRequest): Promise<IGetEpisodeResponse> => {
    const { data } = await axios.get(`/episodes/${episodeId}`);

    return data;
  }
}

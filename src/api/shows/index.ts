import { IEpisode, IPodcast } from "types/podcast";
import axios from "axios";

interface IShowBaseRequest {
  showId: string
}

interface IGetShowRequest extends IShowBaseRequest { }
interface IGetShowResponse extends IPodcast {}

interface IGetShowEpisodesRequest extends IShowBaseRequest { }
interface IGetShowEpisodesResponse {
  items: IEpisode[];
  total: number;
  limit: number;
  offset: number;
}

export const shows = {
  getShow: async ({ showId }: IGetShowRequest): Promise<IGetShowResponse> => {
    const { data } = await axios.get(`/shows/${showId}`);

    return data;
  },

  getShowEpisodes: async ({ showId }: IGetShowEpisodesRequest): Promise<IGetShowEpisodesResponse> => {
    const { data } = await axios.get(`/shows/${showId}/episodes`);

    return data;
  }
}

import { IEpisode, IPodcast } from "types/podcast";
import axios from "axios";

interface IShowBaseRequest {
  showId: string
}

interface IGetShowRequest extends IShowBaseRequest { }
interface IGetShowResponse extends IPodcast {}

interface IFollowShowRequest extends IShowBaseRequest { }
interface IUnfollowShowRequest extends IShowBaseRequest { }

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
  },

  followShow: async ({ showId }: IFollowShowRequest): Promise<IGetShowResponse> => {
    const { data } = await axios.put(`/me/shows/`, {
      ids: [ showId ],
    });

    return data;
  },

  unfollowShow: async ({ showId }: IUnfollowShowRequest): Promise<IGetShowResponse> => {
    const { data } = await axios.delete(`/me/shows/`, {
      data: {
        ids: [ showId ],
      }
    });

    return data;
  },
}

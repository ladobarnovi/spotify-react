import { ITrack } from "types/track";
import axios from "axios";

interface IGetTrackRequest {
  trackId: string;
}

interface IGetRecommendationsRequest {
  trackIds: string[];
}

interface IGetRecommendationsResponse {
  tracks: ITrack[];
}

interface IGetTrackResponse extends ITrack { };
export const tracks = {
  getTrack: async ({ trackId }: IGetTrackRequest): Promise<IGetTrackResponse> => {
    const { data } = await axios.get(`/tracks/${trackId}`);

    return data;
  },

  recommendations: async (payload: IGetRecommendationsRequest): Promise<IGetRecommendationsResponse> => {
    const { data } = await axios.get(`/recommendations`, {
      params: {
        seed_tracks: payload.trackIds.join(","),
      }
    });

    return data;
  }
}

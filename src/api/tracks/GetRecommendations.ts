import { ITrack } from "types/track";
import axios from "axios";

interface IGetRecommendationsRequest {
  trackIds: string[];
}

interface IGetRecommendationsResponse {
  tracks: ITrack[];
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export async function GetRecommendations({ trackIds }: IGetRecommendationsRequest): Promise<IGetRecommendationsResponse> {
  const { data } = await axios.get<IGetRecommendationsResponse>(`/recommendations`, {
    params: {
      seed_tracks: trackIds.join(","),
    }
  });

  return data;
}
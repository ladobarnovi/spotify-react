import { ITrack } from "types/track";
import axios from "axios";

interface IGetTrackRequest {
  trackId: string;
}

/**
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export async function GetTrack({ trackId }: IGetTrackRequest): Promise<ITrack> {
  const { data } = await axios.get(`/tracks/${trackId}`);
  return data;
}
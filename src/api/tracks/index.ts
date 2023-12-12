import { ITrack } from "types/track";
import axios from "axios";

interface IGetTrackRequest {
  trackId: string;
}

interface IGetTrackResponse extends ITrack { };
export const tracks = {
  getTrack: async ({ trackId }: IGetTrackRequest): Promise<IGetTrackResponse> => {
    const { data } = await axios.get(`/tracks/${trackId}`);

    return data;
  }
}

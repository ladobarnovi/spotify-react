import axios from "axios";

interface IPlayRequest {
  deviceId: string;
  data: {
    uris?: string[];
    context_uri?: string;
    offset?: {
      position: number;
    }
  }
}

export const player = {
  play: async ({ deviceId, data }: IPlayRequest): Promise<void> => {
    await axios.put(`/me/player/play?device_id=${deviceId}`, data);
  },
};

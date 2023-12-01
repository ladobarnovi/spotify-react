import axios from "axios";
import { ESpotifyRepeatMode } from "hooks/usePlayer";

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

interface IShuffleRequest {
  device_id: string;
  state: boolean;
}

interface IRepeatRequest {
  device_id: string;
  state: string;
}

export const player = {
  play: async ({ deviceId, data }: IPlayRequest): Promise<void> => {
    await axios.put(`/me/player/play?device_id=${deviceId}`, data);
  },

  shuffle: async ({ device_id, state }: IShuffleRequest): Promise<void> => {
    await axios.put(`/me/player/shuffle?state=${state}`, {
      device_id
    })
  },

  repeat: async ({ device_id, state }: IRepeatRequest): Promise<void> => {
    await axios.put(`/me/player/repeat?state=${state}`, {
      device_id
    })
  }

};

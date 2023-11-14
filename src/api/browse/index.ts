import axios from "axios";
import {IPlaylist} from "types/playlist";

interface IFeaturedResponse {
  message: string;
  playlists: {
    items: IPlaylist[];
  }
}

export const browse = {
  featured: async (): Promise<IFeaturedResponse> => {
    const { data } = await axios.get("/browse/featured-playlists")

    return data;
  },
}

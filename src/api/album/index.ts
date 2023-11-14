import axios from "axios";
import { IAlbum } from "types/album";

interface IGetAlbumRequest {
  albumId: string;
}

interface IGetAlbumResponse extends IAlbum { }

export const albums = {
  getAlbum: async ({ albumId }: IGetAlbumRequest): Promise<IGetAlbumResponse> => {
    const { data } = await axios.get(`/albums/${albumId}`);

    return data;
  }
}

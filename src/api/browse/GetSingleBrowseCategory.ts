import { ICategory } from "types/category";
import axios from "axios";


/**
 * https://developer.spotify.com/documentation/web-api/reference/get-a-category
 */
export async function GetSingleBrowseCategory(): Promise<ICategory> {
  const { data } = await axios.get<ICategory>("/browse/categories", {
    params: {
      limit: 50
    }
  });

  return data;
}
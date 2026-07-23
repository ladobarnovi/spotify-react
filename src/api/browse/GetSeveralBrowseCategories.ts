import { ICategory } from "types/category";
import axios from "axios";

interface IGetSeveralBrowseCategoriesResponse {
  categories: {
    href: string;
    items: ICategory[]
  }
}


/**
 * https://developer.spotify.com/documentation/web-api/reference/get-categories
 */
export async function GetSeveralBrowseCategories(): Promise<IGetSeveralBrowseCategoriesResponse> {
  const { data } = await axios.get<IGetSeveralBrowseCategoriesResponse>("/browse/categories", {
    params: {
      limit: 50
    }
  });

  return data;
}
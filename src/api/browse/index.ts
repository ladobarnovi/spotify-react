// import axios from "axios";
// import {IPlaylist} from "types/playlist";
// import { ICategory } from "types/category";
//
// interface IFeaturedResponse {
//   message: string;
//   playlists: {
//     items: IPlaylist[];
//   }
// }
//
// interface IGetCategoriesResponse {
//   categories: {
//     href: string;
//     items: ICategory[]
//   }
// }
//
// export const browse = {
//   featured: async (): Promise<IFeaturedResponse> => {
//     const { data } = await axios.get<IFeaturedResponse>("/browse/featured-playlists")
//
//     return data;
//   },
//
//   getCategories: async (): Promise<IGetCategoriesResponse> => {
//     const { data } = await axios.get<IGetCategoriesResponse>("/browse/categories", {
//       params: {
//         limit: 50
//       }
//     });
//
//     return data;
//   }
// }

export * from "./GetSeveralBrowseCategories";
export * from "./GetFeaturedPlaylists";
export * from "./GetSingleBrowseCategory";

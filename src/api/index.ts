
import { playlist } from "api/playlist";
import { player } from "api/player";

import * as search from "api/search";
import * as me from "api/me";
import * as shows from "api/shows";
import * as tracks from "api/tracks";
import * as albums from "api/album";
import * as artists from "api/artists";
import * as episodes from "api/episodes";
import * as browse from "api/browse";
import * as users from "api/users";

export const api = {
  me,
  browse,
  playlist,
  albums,
  artists,
  player,
  search,
  shows,
  episodes,
  tracks,
  users
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { initPlayer } from "hooks/usePlayer";
import { setAxiosBaseUrl } from "utils/axios";
import { tryGetAuthToken } from "utils/auth";
import Home from "modules/home/Home";
import Playlist from "modules/playlist/Playlist";
import Album from "modules/album/Album";
import Artist from "modules/artist/Artist";
import Discography from "modules/artist/discography/Discography";
import RelatedArtists from "modules/artist/related/RelatedArtists";
import SearchMain from "modules/search/SearchMain";
import SearchKeyword from "modules/search/keyword/SearchKeyword";
import SearchIndex from "modules/search/index/SearchIndex";
import RecentSearches from "modules/recent-searches/RecentSearches";
import Layout from "layouts/Layout";
import Login from "modules/login/Login";
import Show from "modules/show/Show";
import Episode from "modules/episode/Episode";
import Track from "modules/track/Track";

initPlayer();
setAxiosBaseUrl();
tryGetAuthToken();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"search"} element={<SearchMain />}>
              <Route path={""} element={<SearchIndex />} />
              <Route path={":keyword"} element={<SearchKeyword />} />
            </Route>
            <Route path={"/recent-searches"} element={<RecentSearches />} />
            <Route path={"playlist/:id"} element={<Playlist />} />
            <Route path={"album/:id"} element={<Album />} />
            <Route path={"artist/:id"} element={<Artist />} />
            <Route path={"artist/:id/discography"} element={<Discography />} />
            <Route path={"artist/:id/related"} element={<RelatedArtists />} />
            <Route path={"show/:id"} element={<Show />} />
            <Route path={"episode/:id"} element={<Episode />} />
            <Route path={"track/:id"} element={<Track />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../modules/home/Home";
import SearchMain from "../modules/search/SearchMain";
import SearchIndex from "../modules/search/index/SearchIndex";
import SearchKeyword from "../modules/search/keyword/SearchKeyword";
import RecentSearches from "../modules/recent-searches/RecentSearches";
import Playlist from "../modules/playlist/Playlist";
import Album from "../modules/album/Album";
import Artist from "../modules/artist/Artist";
import Discography from "../modules/artist/discography/Discography";
import RelatedArtists from "../modules/artist/related/RelatedArtists";
import Show from "../modules/show/Show";
import Episode from "../modules/episode/Episode";
import Track from "../modules/track/Track";
import Login from "../modules/login/Login";
import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";

export default function App() {
  const { isLoading } = useAuth();

  return isLoading ? null : (
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
  )
}
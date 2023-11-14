import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./layouts/Main/Main";
import { Provider } from "react-redux";
import store from "./store";
import Home from "modules/home/Home";
import { setAxiosBaseUrl } from "utils/axios";
import Playlist from "modules/playlist/Playlist";
import Album from "modules/album/Album";
import Artist from "modules/artist/Artist";

setAxiosBaseUrl();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/search"} element={<Home />} />
            <Route path={"playlist/:id"} element={<Playlist />} />
            <Route path={"album/:id"} element={<Album />} />
            <Route path={"artist/:id"} element={<Artist />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

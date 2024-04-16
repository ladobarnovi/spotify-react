import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initPlayer } from "hooks/usePlayer";
import { setAxiosBaseUrl } from "utils/axios";
import { tryGetAuthToken } from "utils/auth";
import Layout from "layouts/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App";
import { AuthProvider } from "./context/AuthContext";

initPlayer();
setAxiosBaseUrl();
tryGetAuthToken();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

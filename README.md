### Spotify application clone based on [Spotify's Web API](https://developer.spotify.com/documentation/web-api) and [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)


## Setup

1. Copy `.env.example` to `.env` and fill in the values:
   - `REACT_APP_CLIENT_ID` — your app's Client ID from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - `REACT_APP_USER_TOKEN` — an OAuth bearer token for your Spotify account with the scopes listed in `REACT_APP_SCOPES`
   - `REACT_APP_SCOPES`, `REACT_APP_REDIRECT_URL`, `REACT_APP_BASE_URL` — defaults in `.env.example` work for local development
2. Have a Spotify account (Premium required for playback via the Web Playback SDK)

## Run with Docker

- Install Docker
- Run `docker-compose up --build` inside the root folder
- Open [localhost:3000](http://localhost:3000)

## Run locally

- `npm install`
- `npm start` — runs the app in development mode on [localhost:3000](http://localhost:3000)
- `npm run build` — builds the app for production
- `npm test` — runs the test suite

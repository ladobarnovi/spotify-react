### Spotify application clone based on [Spotify's Web API](https://developer.spotify.com/documentation/web-api) and [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)


## [Live Demo](https://ladobarnovi.github.io/spotify-react/)

## Setup

1. Copy `.env.example` to `.env`
   - You can swap `REACT_APP_CLIENT_ID` with your own ID, but Spotify deprecated some of it's API endpoints for new clients, and it's only available for older ones. And the endpoint's like that will just return 403 response.
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

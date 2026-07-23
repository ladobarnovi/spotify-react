import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESpotifyRepeatMode } from "hooks/usePlayer";

export interface IPlayerTrackData {
  trackId: string|null;
  trackUri: string|null;
  trackDuration: number|null;
  trackPosition: number|null;
  trackName: string|null;
  trackAlbum: Spotify.Album|null;
  trackArtists: Spotify.Entity[]|null;
  contextUri: string|null;
  uriId: string|null;
  uriType: string|null;
}

export interface IPlayerControls {
  volume: number;
  isExpanded: boolean;
  isShuffle: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isRepeat: boolean;
  repeatMode: ESpotifyRepeatMode;
}


export interface PlayerState extends IPlayerTrackData, IPlayerControls {
  player: Spotify.Player|null;
  deviceId: string|null;
}


const initialState: PlayerState = {
  player: null,

  deviceId: null,
  volume: 1,
  isExpanded: false,
  isShuffle: false,
  isPlaying: false,
  isPaused: false,
  isRepeat: false,
  repeatMode: 0,

  trackId: null,
  trackUri: null,
  trackDuration: null,
  trackPosition: null,
  trackName: null,
  trackAlbum: null,
  trackArtists: null,
  contextUri: null,
  uriId: null,
  uriType: null,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },

    setPlayerTrackData: (state, action: PayloadAction<IPlayerTrackData>) => {
      const {
        trackId,
        trackUri,
        trackPosition,
        trackDuration,
        trackName,
        trackAlbum,
        trackArtists,
        contextUri,
        uriId,
        uriType,
      } = action.payload;

      state.trackId = trackId;
      state.trackUri = trackUri;
      state.trackDuration = trackDuration;
      state.trackPosition = trackPosition;
      state.trackName = trackName;
      state.trackAlbum = trackAlbum;
      state.trackArtists = trackArtists;
      state.contextUri = contextUri;
      state.uriId = uriId;
      state.uriType = uriType;
    },

    setPlayerControls: (state, action: PayloadAction<IPlayerControls>) => {
      const {
        isPlaying,
        isPaused,
        repeatMode,
        isShuffle,
        isExpanded,
        volume
      } = action.payload;

      state.isPlaying = isPlaying;
      state.isPaused = isPaused;
      state.repeatMode = repeatMode;
      state.isShuffle = isShuffle;
      state.isExpanded = isExpanded;
      state.volume = volume;
    },

    setTrackPosition: (state, action: PayloadAction<number>) => {
      state.trackPosition = action.payload;
    },

    setPlayerVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    }
  }
});

export const {
  setDeviceId,
  setPlayerTrackData,
  setPlayerControls,
  setTrackPosition,
  setPlayerVolume,
} = playerSlice.actions;
export default playerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum } from "types/album";
import { IArtist } from "types/artist";

export interface IPlayerTrackData {
  trackId: string|null
  trackDuration: number|null;
  trackPosition: number|null;
  trackName: string|null;
  trackAlbum: Spotify.Album|null;
  trackArtists: Spotify.Entity[]|null;
  contextUri: string|null;
}

export interface IPlayerControls {
  volume: number;
  isExpanded: boolean;
  isShuffle: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isRepeat: boolean;
}


export interface PlayerState extends IPlayerTrackData, IPlayerControls {
  player: Spotify.Player|null;
  deviceId: string|null;
}


const initialState: PlayerState = {
  player: null,

  deviceId: null,
  volume: 0.5,
  isExpanded: false,
  isShuffle: false,
  isPlaying: false,
  isPaused: false,
  isRepeat: false,

  trackId: null,
  trackDuration: null,
  trackPosition: null,
  trackName: null,
  trackAlbum: null,
  trackArtists: null,
  contextUri: null,
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
        trackPosition,
        trackDuration,
        trackName,
        trackAlbum,
        trackArtists,
        contextUri
      } = action.payload;

      state.trackId = trackId;
      state.trackDuration = trackDuration;
      state.trackPosition = trackPosition;
      state.trackName = trackName;
      state.trackAlbum = trackAlbum;
      state.trackArtists = trackArtists;
      state.contextUri = contextUri;
    },

    setPlayerControls: (state, action: PayloadAction<IPlayerControls>) => {
      const {
        isPlaying,
        isPaused,
        isRepeat,
        isShuffle,
        isExpanded,
        volume
      } = action.payload;

      state.isPlaying = isPlaying;
      state.isPaused = isPaused;
      state.isRepeat = isRepeat;
      state.isShuffle = isShuffle;
      state.isExpanded = isExpanded;
      state.volume = volume;
    },

    setTrackPosition: (state, action: PayloadAction<number>) => {
      state.trackPosition = action.payload;
    },

    setPlayer: (state, action: PayloadAction<Spotify.Player>) => {
      state.player = action.payload;
    }
  }
});

export const {
  setDeviceId,
  setPlayerTrackData,
  setPlayerControls,
  setTrackPosition,
  setPlayer,
} = playerSlice.actions;
export default playerSlice.reducer;

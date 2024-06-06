import {
  IPlayerControls,
  IPlayerTrackData,
  setDeviceId,
  setPlayerControls,
  setPlayerTrackData,
  setTrackPosition,
  setPlayerVolume
} from "store/player";
import store, { RootState } from "store";
import { useSelector } from "react-redux";
import { api } from "api";
import { IEntityBase } from "../types/entityBase";

export enum ESpotifyRepeatMode {
  NO_REPEAT,
  ONCE_REPEAT,
  FULL_REPEAT
}

let player: Spotify.Player;

let trackPositionIntervalId: any = null;

function setPlaybackInterval(state: Spotify.PlaybackState) {
  const { position, paused } = state;
  clearInterval(trackPositionIntervalId);

  if (position >= 0 && !paused) {
    trackPositionIntervalId = setInterval(() => {
      const trackPosition = store.getState().playerReducer.trackPosition || 0;
      store.dispatch(setTrackPosition(trackPosition + 500));
    }, 500);
  }
}

function playerReadyListener({ device_id }: Spotify.WebPlaybackInstance): void {
  store.dispatch(setDeviceId(device_id));
}

function playerStateChangedListener(state: Spotify.PlaybackState): void {
  console.log(state);

  const currentTrack = state.track_window.current_track;
  const contextUri = state?.context.uri;
  const uriId = contextUri === null ? null : contextUri.split(":")[2];
  const uriType = contextUri === null ? null : contextUri.split(":")[1];

  const playerTrackData: IPlayerTrackData = {
    trackId: currentTrack?.id,
    trackName: currentTrack?.name,
    trackUri: currentTrack?.uri,
    trackAlbum: currentTrack?.album,
    trackArtists: currentTrack?.artists,
    trackDuration: state?.duration,
    trackPosition: state?.position,
    contextUri,
    uriId,
    uriType,
  }

  const linkedFromId = currentTrack.linked_from?.id;
  if (linkedFromId != null) {
    playerTrackData.trackId = linkedFromId;
  }

  const playerControls: IPlayerControls = {
    isPlaying: !state.paused,
    isPaused: state.paused,
    isShuffle: state.shuffle,
    isExpanded: false,
    repeatMode: state.repeat_mode,
    isRepeat: state.repeat_mode !== ESpotifyRepeatMode.NO_REPEAT,
    volume: store.getState().playerReducer.volume,
  }

  store.dispatch(setPlayerControls(playerControls));
  store.dispatch(setPlayerTrackData(playerTrackData));

  setPlaybackInterval(state);
}

export function initPlayer() {
  window.onSpotifyWebPlaybackSDKReady = async () => {
    player = new Spotify.Player({
      name: "Custom Web Player",
      getOAuthToken(cb: (token: string) => void) {
        cb(localStorage.token);
      },
      volume: 1
    });

    player.addListener("ready", playerReadyListener);
    player.addListener("player_state_changed", playerStateChangedListener);

    await player.connect();
  };
}

export function usePlayer() {
  const deviceId = useSelector((state: RootState) => state.playerReducer.deviceId) as string;

  const isPlaying = useSelector((state: RootState) => state.playerReducer.isPlaying);
  const isPaused = useSelector((state: RootState) => state.playerReducer.isPaused);
  const repeatMode = useSelector((state: RootState) => state.playerReducer.repeatMode);
  const isShuffle = useSelector((state: RootState) => state.playerReducer.isShuffle);
  const isExpanded = useSelector((state: RootState) => state.playerReducer.isExpanded);
  const isRepeat = useSelector((state: RootState) => state.playerReducer.isRepeat);
  const volume = useSelector((state: RootState) => state.playerReducer.volume);

  const trackPosition = useSelector((state: RootState) => state.playerReducer.trackPosition);
  const trackId = useSelector((state: RootState) => state.playerReducer.trackId);
  const trackUri = useSelector((state: RootState) => state.playerReducer.trackUri);
  const trackArtists = useSelector((state: RootState) => state.playerReducer.trackArtists);
  const trackAlbum = useSelector((state: RootState) => state.playerReducer.trackAlbum);
  const trackName = useSelector((state: RootState) => state.playerReducer.trackName);
  const trackDuration = useSelector((state: RootState) => state.playerReducer.trackDuration);

  const contextUri = useSelector((state: RootState) => state.playerReducer.contextUri);
  const uriId = useSelector((state: RootState) => state.playerReducer.uriId);
  const uriType = useSelector((state: RootState) => state.playerReducer.uriType);


  async function playTrack(uris: string[], position = 0): Promise<void> {
    await api.player.play({
      deviceId,
      data: {
        uris,
        offset: {
          position
        }
      }
    })
  }

  async function playContext(contextUri: string, position = 0): Promise<void> {
    await api.player.play({
      deviceId,
      data: {
        context_uri: contextUri,
        offset: {
          position,
        },
      }
    })
  }

  async function playNext(): Promise<void> {
    if (player == null) return;
    await player.nextTrack();
  }

  async function playPrevious(): Promise<void> {
    if (player == null) return;
    await player.previousTrack();
  }

  async function pausePlayer(): Promise<void> {
    if (player == null) return;
    if (isPlaying) {
      await player.pause();
    }
  }

  async function resumePlayer(): Promise<void> {
    if (player == null) return;
    if (isPaused) {
      await player.resume();
    }
  }

  async function toggleShuffle(): Promise<void> {
    if (player == null || deviceId == null) return;
    await api.player.shuffle({
      device_id: deviceId,
      state: !isShuffle,
    })
  }

  async function toggleRepeat(): Promise<void> {
    if (player == null || deviceId == null) return;

    const state = isRepeat ? "off" : "track";

    await api.player.repeat({
      device_id: deviceId,
      state,
    })
  }

  async function togglePlay(): Promise<void> {
    await player.togglePlay();
  }

  async function seek(position: number): Promise<void> {
    await player.seek(position);
  }

  async function setVolume(value: number): Promise<void> {
    store.dispatch(setPlayerVolume(value));
    await player.setVolume(value);
  }

  function getUriType(uri: string): string {
    return uri.split(":")[1];
  }

  function getUriId(uri: string): string {
    return uri.split(":")[2];
  }

  function getIsInPlayback(entity: IEntityBase): boolean {
    if (entity.id === uriId && (isPlaying || isPaused)) {
      return true;
    }

    if (entity.type === "album" || entity.type === "playlist") {
      if (entity.uri === contextUri && (isPlaying || isPaused)) {
        return true;
      }
    }

    return false;
  }

  return {
    deviceId,
    trackPosition,
    trackId,
    trackUri,
    trackArtists,
    trackAlbum,
    trackName,
    trackDuration,
    isPlaying,
    isPaused,
    repeatMode,
    isShuffle,
    isExpanded,
    contextUri,
    uriId,
    uriType,
    volume,

    playTrack,
    playContext,
    playNext,
    playPrevious,
    resumePlayer,
    pausePlayer,
    toggleShuffle,
    toggleRepeat,
    togglePlay,
    seek,
    setVolume,

    getUriId,
    getUriType,
    getIsInPlayback,
  }
}

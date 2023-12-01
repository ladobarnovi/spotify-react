import {
  IPlayerControls,
  IPlayerTrackData,
  setDeviceId,
  setPlayerControls,
  setPlayerTrackData,
  setTrackPosition,
  setPlayer
} from "store/player";
import store, { RootState } from "store";
import { useSelector } from "react-redux";
import { api } from "api";

export enum ESpotifyRepeatMode {
  NO_REPEAT,
  ONCE_REPEAT,
  FULL_REPEAT
}

let trackPositionIntervalId: any = null;

function setPlaybackInterval(state: Spotify.PlaybackState) {
  const { position, paused } = state;

  clearInterval(trackPositionIntervalId);

  if (position > 0 && !paused) {
    trackPositionIntervalId = setInterval(() => {
      store.dispatch(setTrackPosition(position + 500));
    }, 500);
  }
}

function playerReadyListener({ device_id }: Spotify.WebPlaybackInstance): void {
  store.dispatch(setDeviceId(device_id));
}

function playerStateChangedListener(state: Spotify.PlaybackState): void {
  console.log(state);

  const currentTrack = state.track_window.current_track;

  const playerTrackData: IPlayerTrackData = {
    trackId: currentTrack?.id,
    trackName: currentTrack?.name,
    trackAlbum: currentTrack?.album,
    trackArtists: currentTrack?.artists,
    trackDuration: state?.duration,
    trackPosition: state?.position,
    contextUri: state?.context.uri,
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
    volume: 0.5,
  }

  console.log(playerControls);
  console.log(playerTrackData);
  store.dispatch(setPlayerControls(playerControls));
  store.dispatch(setPlayerTrackData(playerTrackData));

  setPlaybackInterval(state);
}

export function initPlayer() {
  window.onSpotifyWebPlaybackSDKReady = async () => {
    const player: Spotify.Player = new Spotify.Player({
      name: "Custom Web Player",
      getOAuthToken(cb: (token: string) => void) {
        cb(localStorage.token);
      },
      volume: 0.5
    });

    player.addListener("ready", playerReadyListener);
    player.addListener("player_state_changed", playerStateChangedListener);

    await player.connect();
    store.dispatch(setPlayer(player));
  };
}

export function usePlayer() {
  const player = useSelector((state: RootState) => state.playerReducer.player);
  const deviceId = useSelector((state: RootState) => state.playerReducer.deviceId) as string;

  const isPlaying = useSelector((state: RootState) => state.playerReducer.isPlaying);
  const isPaused = useSelector((state: RootState) => state.playerReducer.isPaused);
  const repeatMode = useSelector((state: RootState) => state.playerReducer.repeatMode);
  const isShuffle = useSelector((state: RootState) => state.playerReducer.isShuffle);
  const isExpanded = useSelector((state: RootState) => state.playerReducer.isExpanded);
  const isRepeat = useSelector((state: RootState) => state.playerReducer.isRepeat);

  const trackPosition = useSelector((state: RootState) => state.playerReducer.trackPosition);
  const trackId = useSelector((state: RootState) => state.playerReducer.trackId);
  const trackArtists = useSelector((state: RootState) => state.playerReducer.trackArtists);
  const trackAlbum = useSelector((state: RootState) => state.playerReducer.trackAlbum);
  const trackName = useSelector((state: RootState) => state.playerReducer.trackName);
  const trackDuration = useSelector((state: RootState) => state.playerReducer.trackDuration);

  const contextUri = useSelector((state: RootState) => state.playerReducer.contextUri);


  async function playTrack(uris: string[]): Promise<void> {
    await api.player.play({
      deviceId,
      data: {
        uris
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

  function getUriType(uri: string): string {
    return uri.split(":")[1];
  }

  function getUriId(uri: string): string {
    return uri.split(":")[2];
  }

  return {
    trackPosition,
    trackId,
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

    playTrack,
    playContext,
    playNext,
    playPrevious,
    resumePlayer,
    pausePlayer,
    toggleShuffle,
    toggleRepeat,

    getUriId,
    getUriType,
  }
}

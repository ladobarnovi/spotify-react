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
    isRepeat: false,
    isExpanded: false,
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
  const isRepeat = useSelector((state: RootState) => state.playerReducer.isRepeat);
  const isShuffle = useSelector((state: RootState) => state.playerReducer.isShuffle);
  const isExpanded = useSelector((state: RootState) => state.playerReducer.isExpanded);

  const trackPosition = useSelector((state: RootState) => state.playerReducer.trackPosition);
  const trackId = useSelector((state: RootState) => state.playerReducer.trackId);
  const trackArtists = useSelector((state: RootState) => state.playerReducer.trackArtists);
  const trackAlbum = useSelector((state: RootState) => state.playerReducer.trackAlbum);
  const trackName = useSelector((state: RootState) => state.playerReducer.trackName);
  const trackDuration = useSelector((state: RootState) => state.playerReducer.trackDuration);

  async function playTrack(uris: string[]): Promise<void> {
    await api.player.play({
      deviceId,
      data: {
        uris
      }
    })
  }

  async function playPlaylist(contextUri: string, position = 0): Promise<void> {
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
    console.log("play Next before")
    if (player == null) return;
    console.log("Play Next");
    await player.nextTrack();
  }

  async function playPrevious(): Promise<void> {
    console.log("play prev before")
    if (player == null) return;
    console.log("Play Prev");
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

  return {
    trackPosition,
    trackId,
    trackArtists,
    trackAlbum,
    trackName,
    trackDuration,
    isPlaying,
    isPaused,
    isRepeat,
    isShuffle,
    isExpanded,

    playTrack,
    playPlaylist,
    playNext,
    playPrevious,
    resumePlayer,
    pausePlayer,
  }
}

import { ITrack, ITrackContainer } from "types/track";

export function getTrackContainers(
  arrTrackContainer: ITrackContainer[]|null|undefined,
  arrTracks: ITrack[]|null|undefined
): ITrackContainer[]|null|undefined {
  if (arrTrackContainer != null) return arrTrackContainer;

  if (arrTracks != null) {
    return arrTracks.map((track) => ({
      added_at: "",
      track
    }));
  }

  return arrTrackContainer;
}

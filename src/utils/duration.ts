import { ITrack } from "types/track";

export function getFullDuration(tracks: ITrack[]): string {
  let d = 0;

  for (let i = 0; i < tracks.length; i++) {
    d += tracks[i].duration_ms / 1000;
  }

  const hours = Math.floor(d / 3600);
  const minutes = Math.floor((d % 3600) / 60);
  const seconds = Math.floor(d % 60);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hr`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} min`);
  }

  if (seconds > 0) {
    parts.push(`${seconds} sec`);
  }

  return parts.join(" ");
}

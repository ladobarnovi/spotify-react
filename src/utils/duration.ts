import { ITrack } from "types/track";

export function getFullDuration(tracks: ITrack[]): string {
  let duration = 0;

  for (let i = 0; i < tracks.length; i++) {
    duration += tracks[i].duration_ms;
  }

  return getFormattedDuration(duration);
}

export function getFormattedDuration(duration_ms: number): string {
  const duration_sec = duration_ms / 1000;

  const hours = Math.floor(duration_sec / 3600);
  const minutes = Math.floor((duration_sec % 3600) / 60);
  const seconds = Math.floor(duration_sec % 60);

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

import { useState } from "react";

export function useTrackSelection() {
  const [ selectedTrackId, setSelectedTrackId ] = useState<string|null>(null);

  function toggleTrackSelection(id: string): void {
    setSelectedTrackId(selectedTrackId === id ? null : id);
  }

  return { selectedTrackId, toggleTrackSelection };
}

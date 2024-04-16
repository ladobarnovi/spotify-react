import styles from "./AddTrackToPlaylistPopup.module.scss";
import { useQueries, useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "../../hooks/useScroll";
import { api } from "../../api";
import IconPlus from "../Icons/IconPlus";
import IconCheck from "../Icons/IconCheck";
import EntityImage from "../Common/EntityImage/EntityImage";
import { useAuth } from "context/AuthContext";

interface IProps {
  onClose: () => void,
  trackId: string;
}

function AddTrackToPlaylistPopup({ onClose, trackId }: IProps) {
  const [ arrSettledIds, setArrSettledIds ] = useState<string[]>([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isEdited, setIsEdited ] = useState(false)
  const [ arrInitialPlaylistIdsSnapshot, setArrInitialPlaylistIdsSnapshot ] = useState<string[]>([]);
  const [ arrContainingPlaylistIds, setArrContainingPlaylistIds ] = useState<string[]>([]);
  const refContent = useRef<HTMLDivElement>(null);
  const { refScrollbar } = useScroll();
  const { user } = useAuth()
  const { data: arrPlaylists } = useQuery({
    queryKey: [ "fetchMyPlaylists" ],
    queryFn: async () => (await api.me.playlists({
      limit: 50,
      offset: 0,
    })).items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const arrFilteredPlaylists = arrPlaylists?.filter((playlist) => playlist.owner.id === user!.id) || [];

  const arrQueryResults = useQueries(arrFilteredPlaylists.map((playlist) => ({
    queryKey: [ "fetchPlaylist", playlist.id ],
    queryFn: async () => await api.playlist.fetchPlaylist({ playlistId: playlist.id }),
    refetchOnWindowFocus: false,
    onSettled: () => {
      setArrSettledIds((prevState) => [ ...prevState, playlist.id ])
    },
  })));

  useEffect(() => {
    const arrIdsSnapshot: string[] = [];
    arrQueryResults.forEach((result) => {
      if (result.isLoading || result.data == null) return;
      if (result.data.owner.id !== user?.id) return;

      const arrTrackIds = result.data.tracks.items.map((trackContainer) => trackContainer.track.id);
      if (arrTrackIds.includes(trackId)) {
        arrIdsSnapshot.push(result.data.id);
      }
    })

    setArrInitialPlaylistIdsSnapshot([...arrIdsSnapshot]);
    setArrContainingPlaylistIds([...arrIdsSnapshot]);
  }, [ arrSettledIds ]);

  useEffect(() => {
    const isSameLength = arrContainingPlaylistIds.length == arrInitialPlaylistIdsSnapshot.length;
    const isIncluded = arrContainingPlaylistIds.every((id) => arrInitialPlaylistIdsSnapshot.includes(id));

    setIsEdited(!(isSameLength && isIncluded))
  }, [ arrContainingPlaylistIds ]);

  useEffect(() => {
    window.addEventListener("click", clickListener);

    return () => window.removeEventListener("click", clickListener);
  }, [  ]);

  function tryGetActiveClass(playlistId: string): string {
    return arrContainingPlaylistIds.includes(playlistId) ? styles.active : "";
  }

  function toggleIncludeInPlaylists(playlistId: string): void {
    if (arrContainingPlaylistIds.includes(playlistId)) {
      // remove from list
      setArrContainingPlaylistIds((prevState) => {
        const index = prevState.indexOf(playlistId);
        prevState.splice(index, 1)
        return [ ...prevState ];
      })
    }
    else {
      setArrContainingPlaylistIds((prevState) => [ ...prevState, playlistId ])
    }
  }

  function clickListener(event: MouseEvent): void {
    if (refContent.current == null) return;

    if (!refContent.current.contains(event.target as HTMLElement)) {
      onClose();
    }
  }

  async function updatePlaylists(): Promise<void> {
    if (!isEdited) return;

    const arrAddToPlaylistIds = arrContainingPlaylistIds.filter((id) => !arrInitialPlaylistIdsSnapshot.includes(id));
    const arrRemoveFromPlaylistIds = arrInitialPlaylistIdsSnapshot.filter((id) => !arrContainingPlaylistIds.includes(id));

    arrAddToPlaylistIds.forEach((playlistId) => api.playlist.addTrackToPlaylist({
      playlistId,
      trackUri: `spotify:track:${trackId}`
    }));
    arrRemoveFromPlaylistIds.forEach((playlistId) => api.playlist.removeTrackFromPlaylist({
      playlistId,
      trackUri: `spotify:track:${trackId}`
    }));

    onClose();
  }

  const elPlaylists = (
    <ul>
      {
        arrFilteredPlaylists.map((playlist) => {
          return (
            <li onClick={() => toggleIncludeInPlaylists(playlist.id)} key={playlist.id} className={tryGetActiveClass(playlist.id)}>
              <div className={styles.imageContainer}>
                <EntityImage entity={playlist} isRounded={false}/>
              </div>
              <p>{playlist.name}</p>

              <div className={styles.checkBox}>
                <IconCheck/>
              </div>
            </li>
          )
        })
      }
    </ul>
  );

  const elSaveButton = isEdited ? (
    <button onClick={updatePlaylists} className={styles.saveButton}>Save</button>
  ) : null


  return (
    <div ref={refContent} className={styles.addTrackToPlaylistPopup}>
      <header>
        <span>Add to playlist</span>
      </header>

      <main>
        <button className={styles.newPlaylistButton}>
          <IconPlus/>
          <span>New Playlist</span>
        </button>

        <div className={styles.playlistContainer} ref={refScrollbar}>
          { elPlaylists }
        </div>
      </main>

      <footer>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
        {
          elSaveButton
        }
      </footer>
    </div>
  )
}

export default AddTrackToPlaylistPopup;
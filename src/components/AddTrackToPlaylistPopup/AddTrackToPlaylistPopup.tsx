import styles from "./AddTrackToPlaylistPopup.module.scss";
import { useQueries, useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "../../hooks/useScroll";
import { api } from "../../api";
import IconPlus from "../Icons/IconPlus";
import IconCheck from "../Icons/IconCheck";
import EntityImage from "../Common/EntityImage/EntityImage";

interface IProps {
  onClose: () => void,
  trackId: string;
}

function AddTrackToPlaylistPopup({ onClose, trackId }: IProps) {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ arrContainingPlaylistIds, setArrContainingPlaylistIds ] = useState<string[]>([]);
  const refContent = useRef<HTMLDivElement>(null);
  const { refScrollbar } = useScroll();
  const { data: arrPlaylists } = useQuery({
    queryKey: [ "fetchMyPlaylists" ],
    queryFn: async () => (await api.me.playlists({
      limit: 5,
      offset: 0,
    })).items
  });

  const arrQueryResults = useQueries(arrPlaylists?.map((playlist) => ({
    queryKey: [ "fetchPlaylist", playlist.id ],
    queryFn: async () => await api.playlist.fetchPlaylist({ playlistId: playlist.id }),
    refetchOnWindowFocus: false,
  })) || []);

  useEffect(() => {
    console.log("Change Listener", isLoaded)
    console.log(arrQueryResults);
    if (isLoaded) return;

    setIsLoaded(arrQueryResults.length > 0 && !arrQueryResults.some((result) => result.isLoading));

    const arrIdsSnapshot: string[] = [];
    arrQueryResults.forEach((result) => {
      if (result.isLoading || result.data == null) return;

      const arrTrackIds = result.data.tracks.items.map((trackContainer) => trackContainer.track.id);
      if (arrTrackIds.includes(trackId)) {
        arrIdsSnapshot.push(result.data.id);
      }
    })

    setArrContainingPlaylistIds(arrIdsSnapshot);
    console.log(arrIdsSnapshot)
  }, [ arrQueryResults ]);


  function tryGetActiveClass(playlistId: string): string {
    return arrContainingPlaylistIds.includes(playlistId) ? styles.active : "";
  }

  function toggleIncludeInPlaylists(playlistId: string): void {
    if (arrContainingPlaylistIds.includes(playlistId)) {
      // remove from list
      setArrContainingPlaylistIds((prev) => {
        const index = prev.indexOf(playlistId);
        console.log(index);
        console.log(prev);
        prev.splice(index, 1)
        console.log(prev)
        return [ ...prev ];
      })
    }
    else {
      setArrContainingPlaylistIds((prev) => [ ...prev, playlistId ])
    }
  }

  const elPlaylists = (
    <ul>
      {
        arrPlaylists?.map((playlist) => {
          const image = playlist.images ? playlist.images[0] : undefined;
          return (
            <li onClick={() => toggleIncludeInPlaylists(playlist.id)} key={playlist.id} className={tryGetActiveClass(playlist.id)}>
              <div className={styles.imageContainer}>
                <EntityImage image={image} isRounded={false}/>
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

  function clickListener(event: MouseEvent): void {
    if (refContent.current == null) return;

    if (!refContent.current.contains(event.target as HTMLElement)) {
      onClose();
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickListener);

    return () => window.removeEventListener("click", clickListener);
  }, [  ]);


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
      </footer>
    </div>
  )
}

export default AddTrackToPlaylistPopup;
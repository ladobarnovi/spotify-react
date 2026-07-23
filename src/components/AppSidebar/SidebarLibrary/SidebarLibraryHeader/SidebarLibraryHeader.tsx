import styles from "./SidebarLibraryHeader.module.scss";
import IconLibrary from "components/Icons/IconLibrary";
import IconPlus from "components/Icons/IconPlus";
import IconArrowRight from "components/Icons/IconArrowRight";
import { useDispatch } from "react-redux";
import { setIsSidebarCompact } from "store/global/globalSlice";
import CreatePlaylistContextMenu from "./CreatePlaylistContextMenu/CreatePlaylistContextMenu";

function SidebarLibraryHeader() {
  const dispatch = useDispatch();

  function onSidebarToggleButtonClick(): void {
    dispatch(setIsSidebarCompact(true));
  }

  return (
    <div className={ styles.sidebarLibraryHeader }>
      <button onClick={onSidebarToggleButtonClick} className={ styles.expander }>
        <IconLibrary />
        <div>Your Library</div>
      </button>

      <div className={ styles.actions }>
        <CreatePlaylistContextMenu>
          <button className={styles.addPlaylist}>
            <IconPlus/>
          </button>
        </CreatePlaylistContextMenu>
        <button className={styles.enlarge}>
          <IconArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default SidebarLibraryHeader;

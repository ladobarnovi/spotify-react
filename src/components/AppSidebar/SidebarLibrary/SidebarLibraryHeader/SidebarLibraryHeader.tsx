import styles from "./SidebarLibraryHeader.module.scss";
import IconLibrary from "components/Icons/IconLibrary";
import IconPlus from "components/Icons/IconPlus";
import IconArrowRight from "components/Icons/IconArrowRight";

function SidebarLibraryHeader() {
  return (
    <div className={ styles.sidebarLibraryHeader }>
      <button className={ styles.expander }>
        <IconLibrary />
        <div>Your Library</div>
      </button>

      <div className={ styles.actions }>
        <button className={ styles.addPlaylist }>
          <IconPlus />
        </button>
        <button className={ styles.enlarge }>
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

export default SidebarLibraryHeader;

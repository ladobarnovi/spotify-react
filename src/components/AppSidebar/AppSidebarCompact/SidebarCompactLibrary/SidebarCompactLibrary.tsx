import styles from "./SidebarCompactLibrary.module.scss"
import IconLibrary from "components/Icons/IconLibrary";
import { NavLink } from "react-router-dom";
import { useScroll } from "hooks/useScroll";
import { setIsSidebarCompact } from "store/global/globalSlice";
import { useDispatch } from "react-redux";
import { useSidebarContext } from "context/SidebarContext";

function SidebarCompactLibrary() {
  const { refScrollbar } = useScroll();
  const { arrLibrary } = useSidebarContext();
  const dispatch = useDispatch();

  const elEntities = arrLibrary.map((entity) => {
    const imageUrl = entity.images ? entity.images[0].url : undefined;


    return (
      <NavLink key={entity.id} to={`/${entity.type}/${entity.id}`}>
        <div className={styles.entityItem}>
          <img src={imageUrl} alt={entity.name} />
        </div>
      </NavLink>
    )
  });

  function onSidebarToggleButtonClick(): void {
    dispatch(setIsSidebarCompact(false));
  }

  return (
    <section className={ styles.sidebarCompactLibrary }>
      <header>
        <button onClick={onSidebarToggleButtonClick}>
          <IconLibrary />
        </button>
      </header>

      <div className={styles.scrollMain} ref={refScrollbar}>
        <div className={styles.scrollContent}>
          { elEntities }
        </div>
      </div>
    </section>
  )
}

export default SidebarCompactLibrary;

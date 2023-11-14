import styles from "./SidebarEntityTypes.module.scss";
import { useState } from "react";
import IconClose from "components/Icons/IconClose";

interface EntityItem {
  key: string;
  title: string;
}

interface IProps {
  setFilter: (filterBy: string | null) => void
}


function SidebarEntityTypes({ setFilter }: IProps) {
  const [ selectedEntity, setSelectedEntity ] = useState<EntityItem|null>();

  const arrEntityTypes: EntityItem[] = [
    { key: "playlist", title: "Playlists", },
    { key: "artist", title: "Artists", },
    { key: "album", title: "Albums", },
    { key: "show", title: "Podcasts & Shows" },
  ];

  const arrEntityTypeNodes = selectedEntity == null ? arrEntityTypes.map((item) => (
    <button
      key={item.key}
      className={ styles.entityTypeItem }
      onClick={() => toggleSelect(item) }
    >
      { item.title }
    </button>
  )) : (
    <button className={ `${styles.entityTypeItem} ${styles.active}` }>
      { selectedEntity.title }
    </button>
  );

  const clearSelectionButton = selectedEntity != null ? (
    <button className={ styles.clearSelectionButton } onClick={ clearFilter }>
      <IconClose />
    </button>
  ) : null;

  function toggleSelect(entity: EntityItem) {
    if (selectedEntity === entity) {
      clearFilter();
    } else {
      setSelectedEntity(entity);
      setFilter(entity.key);
    }
  }

  function clearFilter() {
    setSelectedEntity(null);
    setFilter(null);
  }

  return (
    <div className={ styles.sidebarEntityTypes }>
      <div className={ styles.entityList }>
        { clearSelectionButton }
        { arrEntityTypeNodes }
      </div>
    </div>
  )
}

export default SidebarEntityTypes;

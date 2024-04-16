import styles from "./SidebarLibrary.module.scss";
import SidebarLibraryHeader from "components/AppSidebar/SidebarLibrary/SidebarLibraryHeader/SidebarLibraryHeader";
import SidebarEntityTypes from "components/AppSidebar/SidebarLibrary/SidebarEntityTypes/SidebarEntityTypes";
import SidebarList from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarList";
import { useState } from "react";

function SidebarLibrary() {
  const [ entityTypeFilter, setEntityTypeFilter ] = useState<string | null>(null);

  return (
    <div className={styles.sidebarLibrary}>
      <SidebarLibraryHeader />
      <SidebarEntityTypes setFilter={(filterBy) => { setEntityTypeFilter(filterBy) }} />
      <SidebarList filterBy={ entityTypeFilter } />
    </div>
  );
}

export default SidebarLibrary;

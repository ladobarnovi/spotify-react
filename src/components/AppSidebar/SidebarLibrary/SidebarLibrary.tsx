import styles from "./SidebarLibrary.module.scss";
import SidebarLibraryHeader from "components/AppSidebar/SidebarLibrary/SidebarLibraryHeader/SidebarLibraryHeader";
import SidebarEntityTypes from "components/AppSidebar/SidebarLibrary/SidebarEntityTypes/SidebarEntityTypes";
import SidebarList from "components/AppSidebar/SidebarLibrary/SidebarList/SidebarList";
import { useState } from "react";
import { SearchProvider } from "../../../context/SearchContext";

function SidebarLibrary() {
  const [ entityTypeFilter, setEntityTypeFilter ] = useState<string | null>(null);

  return (
    <div className={styles.sidebarLibrary}>
      <SearchProvider>
        <SidebarLibraryHeader />
        <SidebarEntityTypes setFilter={(filterBy) => { setEntityTypeFilter(filterBy) }} />
        <SidebarList filterBy={ entityTypeFilter } />
      </SearchProvider>
    </div>
  );
}

export default SidebarLibrary;

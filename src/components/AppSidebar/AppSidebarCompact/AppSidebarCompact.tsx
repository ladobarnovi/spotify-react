import styles from "./AppSidebarCompact.module.scss"
import SidebarCompactNav from "components/AppSidebar/AppSidebarCompact/SidebarCompactNav/SidebarCompactNav";
import SidebarCompactLibrary from "components/AppSidebar/AppSidebarCompact/SidebarCompactLibrary/SidebarCompactLibrary";

function AppSidebarCompact() {
  return (
    <div className={styles.appSidebarCompact}>
      <SidebarCompactNav />
      <SidebarCompactLibrary />
    </div>
  )
}

export default AppSidebarCompact;

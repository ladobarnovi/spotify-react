import styles from "./AppSidebarFull.module.scss";
import SidebarNav from "components/AppSidebar/SidebarNav/SidebarNav";
import SidebarLibrary from "components/AppSidebar/SidebarLibrary/SidebarLibrary";

export default function AppSidebarFull() {
  return (
    <div className={styles.appSidebarFull}>
      <SidebarNav />
      <SidebarLibrary />
    </div>
  )
}
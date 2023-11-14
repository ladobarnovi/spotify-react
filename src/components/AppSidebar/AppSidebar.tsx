import styles from "./AppSidebar.module.scss";
import SidebarNav from "components/AppSidebar/SidebarNav/SidebarNav";
import SidebarLibrary from "components/AppSidebar/SidebarLibrary/SidebarLibrary";

function AppSidebar() {
  return (
    <div className={ styles.appSidebar }>
      <SidebarNav />
      <SidebarLibrary />
    </div>
  );
}

export default AppSidebar;

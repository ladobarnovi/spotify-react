import { useSelector } from "react-redux";
import { RootState } from "store";
import AppSidebarCompact from "./AppSidebarCompact/AppSidebarCompact";
import AppSidebarFull from "./AppSidebarFull/AppSidebarFull";
import { SidebarProvider } from "context/SidebarContext";

function AppSidebar() {
  const isSidebarCompact = useSelector((state: RootState) => state.globalReducer.isSidebarCompact);

  return (
    <>
      <SidebarProvider>
        { isSidebarCompact ? (<AppSidebarCompact />) : (<AppSidebarFull />) }
      </SidebarProvider>
    </>
  );
}

export default AppSidebar;

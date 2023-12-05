import styles from "./SidebarCompactNav.module.scss"
import { NavLink } from "react-router-dom";
import IconHomeHollow from "components/Icons/IconHomeHollow";
import IconSearch from "components/Icons/IconSearch";

function SidebarCompactNav() {
  return (
    <section className={styles.sidebarCompactNav}>
      <NavLink to={"/"}>
        <IconHomeHollow />
      </NavLink>
      <NavLink to={"/search"}>
        <IconSearch />
      </NavLink>
    </section>
  )
}

export default SidebarCompactNav;

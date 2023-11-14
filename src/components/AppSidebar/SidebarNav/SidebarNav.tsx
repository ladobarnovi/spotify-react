import styles from "./SidebarNav.module.scss";
import HomeFilled from "assets/svg/home-filled.svg";
import HomeHollow from "assets/svg/home-hollow.svg";
import SearchFilled from "assets/svg/search-filled.svg"
import SearchHollow from "assets/svg/search-hollow.svg"
import { NavLink } from "react-router-dom";
import IconHomeFilled from "components/Icons/IconHomeFilled";
import IconHomeHollow from "components/Icons/IconHomeHollow";

function SidebarNav() {
  return (
    <div className={styles.sidebarNav}>
      <ul>
        <li>
          <NavLink className={({ isActive }) => isActive ? styles.active : ""} to={"/"}>
            <div className={ styles.icon }>
              <div className={ styles.filled }>
                <IconHomeFilled />
              </div>
              <div className={ styles.hollow }>
                <IconHomeHollow />
              </div>
            </div>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => isActive ? styles.active : ""} to={ "/search" }>
            <div className={ styles.icon }>
              <img className={ styles.filled } src={ SearchFilled } alt="Search Filled"/>
              <img className={ styles.hollow } src={ SearchHollow } alt="Search Hollow"/>
            </div>
            <p>Search</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SidebarNav;

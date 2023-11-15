import styles from "./HeaderNavigation.module.scss"
import IconChevronLeft from "components/Icons/IconChevronLeft";
import IconChevronRight from "components/Icons/IconChevronRight";
import { useNavigate } from "react-router-dom";

function HeaderNavigation() {
  const navigate = useNavigate();

  return (
    <div className={ styles.headerNavigation }>
      <button onClick={() => navigate(-1)} className={styles.back}>
        <IconChevronLeft />
      </button>
      <button onClick={() => navigate(1)} className={styles.forward}>
        <IconChevronRight />
      </button>
    </div>
  )
}

export default HeaderNavigation;

import styles from "./SidebarGridView.module.scss"
import { IEntityBase } from "types/entityBase";
import { NavLink } from "react-router-dom";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { capitalizeFirstLetter, filterByKeyword } from "utils/string";
import EntityOwner from "components/Common/EntityOwner/EntityOwner";
import { useSearchContext } from "context/SearchContext";
import HighlightedText from "components/HighlightedText/HighlightedText";

interface IProps {
  arrData: IEntityBase[]
}

function SidebarGridView({ arrData }: IProps) {
  const { keyword } = useSearchContext();
  const arrFilteredData = filterByKeyword(arrData, keyword);

  const elItems = arrFilteredData.map((item) => {
    return (
      <NavLink to={`/${item.type}/${item.id}`} key={item.id} className={styles.item}>
        <div className={styles.imageContainer}>
          <EntityImage
            entity={item}
            isRounded={item.type === "artist"}
          />
        </div>
        <HighlightedText className={styles.title} text={item.name} />
        <p className={styles.subtitle}>
          <span className={styles.entityType}>{ capitalizeFirstLetter(item.type) }</span>
          <EntityOwner entity={item} />
        </p>
      </NavLink>
    )
  })

  return (
    <div className={ styles.sidebarGridView }>
      { elItems }
    </div>
  )
}

export default SidebarGridView;

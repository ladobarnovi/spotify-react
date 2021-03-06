import styles from "./SearchCategoryList.module.scss"
import { useEffect, useState } from "react";
import { api } from "api";
import { ICategory } from "types/category";
import { NavLink } from "react-router-dom";
import ResponsiveGridWrapper from "components/ResponsiveGridWrapper/ResponsiveGridWrapper";

function SearchCategoryList() {
  const [ arrCategories, setArrCategories ] = useState<ICategory[]>([])

  useEffect(() => {
    (async () => {
      const response = await api.browse.getCategories();
      console.log(response.categories.items)
      setArrCategories(response.categories.items);
    })()
  }, [ ])

  function generateRandomBackground(): React.CSSProperties {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * (350 - r));
    const b = Math.floor(Math.random() * (350 - r - g));
    const o = 0.8 + Math.random() * 0.2;

    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${o})`
    }
  }

  const elCategories = arrCategories.map((category) => (
    <NavLink
      to={`/genre/${category.id}`}
      className={styles.categoryItem}
      style={generateRandomBackground()}
    >
      <p className={styles.title}>{ category.name }</p>
      <img src={category.icons[0].url} alt={category.name}/>
    </NavLink>
  ));

  return (
    <div className={ styles.searchCategoryList }>
      <p className={styles.title}>Browse all</p>
      <ResponsiveGridWrapper>
        { elCategories }
      </ResponsiveGridWrapper>
    </div>
  )
}

export default SearchCategoryList;


import styles from "./SearchIndex.module.scss"
import { useSearchHistory } from "hooks/useSearchHistory";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import SearchCategoryList from "modules/search/components/SearchCategoryList/SearchCategoryList";

function SearchIndex() {
  const { removeHistoryItem, arrHistoryEntities } = useSearchHistory();


  const elHistoryRow = arrHistoryEntities.length > 0 ? (
    <CardsRow
      title={"Recent searches"}
      arrData={arrHistoryEntities}
      onCardClosed={removeHistoryItem}
      url={"/recent-searches"}
    />
  ) : null;

  return (
    <div className={styles.searchIndex}>
      { elHistoryRow }

      <SearchCategoryList />
    </div>
  )
}

export default SearchIndex;

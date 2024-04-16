import styles from "./RecentSearches.module.scss"
import { useSearchHistory } from "hooks/useSearchHistory";
import { useEffect, useState } from "react";
import { IEntityBase } from "types/entityBase";
import ResponsiveGridWrapper from "components/ResponsiveGridWrapper/ResponsiveGridWrapper";
import EntityCard from "components/EntityCard/EntityCard";
import { useNavigate } from "react-router-dom";

function RecentSearches() {
  const { getHistory, clearHistory } = useSearchHistory();
  const navigate = useNavigate();
  const arrEntities = getHistory();

  function onClearHistory(): void {
    clearHistory();
    navigate("/search");
  }

  const elCards =  arrEntities.map((entity) => (
    <EntityCard key={entity.id} data={entity} />
  ));

  return (
    <div className={styles.recentSearches}>
      <div className={styles.header}>
        <p className={styles.title}>Recent Searches</p>
        <button onClick={onClearHistory}>Clear search history</button>
      </div>
      <ResponsiveGridWrapper>
        { elCards }
      </ResponsiveGridWrapper>
    </div>
  )
}

export default RecentSearches;

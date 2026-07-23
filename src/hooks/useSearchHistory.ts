import { IEntityBase } from "types/entityBase";
import { useEffect, useState } from "react";

const SEARCH_HISTORY_KEY = "searchHistory";

export function useSearchHistory() {
  const [ arrHistoryEntities, setArrHistoryEntities ] = useState<IEntityBase[]>([]);

  function getHistory(): IEntityBase[] {
    const jsonHistory = localStorage.getItem(SEARCH_HISTORY_KEY);

    if (jsonHistory == null || jsonHistory.length === 0) return [];

    return JSON.parse(jsonHistory) as IEntityBase[];
  }

  function addHistoryItem(entity: IEntityBase): void {
    removeHistoryItem(entity);
    const arrEntities = getHistory();
    arrEntities.unshift(entity);
    setArrHistoryEntities(arrEntities);
    const jsonEntities = JSON.stringify(arrEntities);
    localStorage.setItem(SEARCH_HISTORY_KEY, jsonEntities);
  }

  function removeHistoryItem(entity: IEntityBase): void {
    const arrEntities = getHistory();
    const index = arrEntities.findIndex((item) => item.id === entity.id);

    if (index < 0) return;

    arrEntities.splice(index, 1);
    const jsonUpdatedEntities = JSON.stringify(arrEntities);
    localStorage.setItem(SEARCH_HISTORY_KEY, jsonUpdatedEntities);

    setArrHistoryEntities(arrEntities)
  }

  function clearHistory(): void {
    localStorage.setItem(SEARCH_HISTORY_KEY, "");
  }

  useEffect(() => {
    setArrHistoryEntities(getHistory());
  }, [ ])

  return {
    getHistory,
    addHistoryItem,
    removeHistoryItem,
    clearHistory,
    arrHistoryEntities,
  }
}

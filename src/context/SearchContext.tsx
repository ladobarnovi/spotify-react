import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ISearchContext {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("SearchContext not defined");
  }
  return context;
}

interface IProps {
  children: ReactNode;
}

export function SearchProvider({ children }: IProps) {
  const [ keyword, setKeyword ] = useState("");

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      { children }
    </SearchContext.Provider>
  )
}
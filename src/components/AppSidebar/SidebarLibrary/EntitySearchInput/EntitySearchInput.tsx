import styles from "./EntitySearchInput.module.scss";
import IconSearch from "components/Icons/IconSearch";
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "context/SearchContext";


interface IProps {
  isAlwaysActive?: boolean;
}
export default function EntitySearchInput({ isAlwaysActive = false }: IProps) {
  const [ isActive, setIsActive ] = useState(isAlwaysActive);
  const { keyword, setKeyword } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null)

  function onInputBlur(): void {
    if (isAlwaysActive) return;

    if (!keyword) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    if (isActive && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [ isActive ]);


  return (
    <div className={`${styles.searchInput} ${isActive ? styles.active : null}`} >
      <button onClick={() => setIsActive(true)}>
        <IconSearch />
      </button>

      <input
        type="text"
        ref={inputRef}
        onBlur={onInputBlur}
        onInput={(e) => setKeyword(e.currentTarget.value)}
        placeholder="Search in Your Library"
      />
    </div>
  )
}
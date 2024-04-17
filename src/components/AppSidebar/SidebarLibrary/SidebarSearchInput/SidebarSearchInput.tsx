import styles from "./SidebarSearchInput.module.scss";
import IconSearch from "components/Icons/IconSearch";
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "context/SearchContext";

export default function SidebarSearchInput() {
  const [ isActive, setIsActive ] = useState(false);
  const { keyword, setKeyword } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null)

  function onInputBlur(): void {
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
    <div className={`${styles.sidebarSearchInput} ${isActive ? styles.active : null}`} >
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
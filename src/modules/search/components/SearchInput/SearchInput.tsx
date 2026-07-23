import styles from "./SearchInput.module.scss"
import { ChangeEvent, useRef, useState } from "react";
import IconSearch from "components/Icons/IconSearch";
import IconClose from "components/Icons/IconClose";

interface IProps {
  onInput: (value: string) => void;
  onClearInput: () => void;
  value: string;
}

export default function SearchInput({ onInput, value, onClearInput }: IProps) {
  const [ keyword, setKeyword ] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  function onInputHandler(e: ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value;
    setKeyword(val);
    onInput(val);
  }

  function clearButtonClickHandler(): void {
    const el = refInput.current;
    if (el == null) return;

    el.value = "";
    setKeyword("");
    onClearInput();
  }

  const elButtonClear = keyword == null || keyword.length === 0 ? null : (
    <button onClick={clearButtonClickHandler} className={styles.buttonClear}>
      <IconClose />
    </button>
  );

  return (
    <div className={styles.searchInput}>
      <input
        ref={refInput}
        onInput={onInputHandler}
        type="text"
        placeholder="What do you want to listen to?"
        defaultValue={value}
      />
      <div className={styles.searchIconContainer}>
        <IconSearch />
      </div>
      { elButtonClear }
    </div>
  )
}
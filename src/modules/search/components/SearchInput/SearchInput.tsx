import styles from "./SearchInput.module.scss"
import IconSearch from "components/Icons/IconSearch";
import { ChangeEvent } from "react";

interface IProps {
  onInput: (value: string) => void;
  value: string;
}

function SearchInput({ onInput, value }: IProps) {
  function onInputHandler(e: ChangeEvent<HTMLInputElement>): void {
    onInput(e.target.value);
  }

  return (
    <div className={ styles.searchInput }>
      <input
        onInput={onInputHandler}
        type="text"
        placeholder="What do you want to listen to?"
        defaultValue={value}
      />
      <div className={styles.iconContainer}>
        <IconSearch />
      </div>
    </div>
  )
}

export default SearchInput;

import styles from "./SearchMain.module.scss"
import { Outlet, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import SearchInput from "modules/search/components/SearchInput/SearchInput";

function SearchMain() {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [ searchKeyword, setSearchKeyword ] = useState(keyword ?? "");
  const [ portal, setPortal ] = useState<React.ReactPortal>();

  function onClearInput(): void {
    setSearchKeyword("");
    navigate("/");
  }

  useEffect(() => {
    const elContainer = document.querySelector("#tpSearchInput") as Element;
    if (elContainer == null) return;

    setPortal(
      createPortal((
        <SearchInput
          onInput={setSearchKeyword}
          onClearInput={onClearInput}
          value={keyword ?? ""}
        />
      ), elContainer)
    );
  }, [ ]);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      navigate(`/search/${searchKeyword}`);
    }
    else {
      navigate("/search");
    }
  }, [ searchKeyword ])

  return (
    <div className={styles.searchMain}>
      { portal }

      <Outlet />
    </div>
  )
}

export default SearchMain;

import styles from "./SearchMain.module.scss"
import { Outlet, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react";

function SearchMain() {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [ searchKeyword, setSearchKeyword ] = useState(keyword ?? "");
  const [ portal, setPortal ] = useState<React.ReactPortal>();

  function onInputHandle(e: ChangeEvent<HTMLInputElement>): void {
    console.log("Setting - ", e.target.value);
    setSearchKeyword(e.target.value);
  }

  useEffect(() => {
    const elContainer = document.querySelector("#tpSearchInput") as Element;
    if (elContainer == null) return;

    setPortal(
      createPortal((
        <input
          type="text"
          onInput={onInputHandle}
        />
      ), elContainer)
    );
  }, [ ]);

  useEffect(() => {
    console.log(searchKeyword.length)
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

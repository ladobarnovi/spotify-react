import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { api } from "api";
import { IPlaylist } from "types/playlist";

function Home() {
  const [ arrFeaturedPlaylists, setArrFeaturedPlaylists ] = useState<IPlaylist[]>([]);

  useEffect(() => {
    api.browse.featured()
      .then((res) => {
        setArrFeaturedPlaylists(res.playlists.items);
      })
  }, []);

  return (
    <div className={styles.homePage}>
      <CardsRow
        arrData={arrFeaturedPlaylists}
        title={"Featured Playlists"}
        url={"/featured"}
      />
    </div>
  )
}

export default Home;

import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";
import { api } from "api";
import { IPlaylist } from "types/playlist";
import ContextMenu, { IContextMenuSection } from "components/ContextMenu/ContextMenu";

function Home() {
  const [ arrFeaturedPlaylists, setArrFeaturedPlaylists ] = useState<IPlaylist[]>([]);

  useEffect(() => {
    api.browse.featured()
      .then((res) => {
        setArrFeaturedPlaylists(res.playlists.items);
      })
  }, []);

  const menuSection: IContextMenuSection[] = [
    {
      title: "Section Title",
      arrItems: [
        { title: "S1", isActive: false, onClick: () => { console.log("Click") } },
        { title: "S2", isActive: false, onClick: () => { console.log("Click") } },
        { title: "S3", isActive: false, onClick: () => { console.log("Click") } },
      ]
    },
    {
      title: "Section Title",
      arrItems: [
        { title: "S1", isActive: false, onClick: () => { console.log("Click") } },
        { title: "S2", isActive: false, onClick: () => { console.log("Click") } },
        { title: "S3", isActive: false, onClick: () => { console.log("Click") } },
      ]
    },
  ]

  return (
    <div className={styles.homePage}>
      <CardsRow
        arrData={arrFeaturedPlaylists}
        title={"Featured Playlists"}
        url={"/featured"}
      />

      <ContextMenu options={ { arrSections: menuSection, alignment: "right" } } >
        <p>Hello</p>
      </ContextMenu>
    </div>
  )
}

export default Home;

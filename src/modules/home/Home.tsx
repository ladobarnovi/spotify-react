import styles from "./Home.module.scss";
import { api } from "api";
import { useQuery } from "react-query";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";

function Home() {
  const { data: arrFeaturedPlaylists } = useQuery({
    queryKey: [ "fetchFeaturedItems" ],
    queryFn: async () => (await api.browse.GetFeaturedPlaylists()).playlists.items
  });

  return (
    <div className={styles.homePage}>
      <CardsRow
        arrData={arrFeaturedPlaylists || []}
        title={"Featured Playlists"}
        url={"/featured"}
      />
    </div>
  )
}

export default Home;

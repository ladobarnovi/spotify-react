import styles from "./Home.module.scss";
import { api } from "api";
import { useQuery } from "react-query";
import CardsRow from "components/EntityCard/CardsRow/CardsRow";

function Home() {
  // const { data: arrTracks } = useQuery({
  //   queryKey: ["topTracks"],
  //   queryFn: async () => (await api.me.GetTopItems({ type: "tracks" })).items,
  // });

  const { data: arrArtists } = useQuery({
    queryKey: ["topArtists"],
    queryFn: async () => (await api.me.GetTopItems({ type: "artists" })).items || [],
  });

  return (
    <div className={styles.homePage}>
      {/* <CardsRow arrData={arrTracks || []} title={"Top Tracks"} /> */}
      <CardsRow arrData={arrArtists || []} title={"Your Favourite Artists"} />
    </div>
  );
}

export default Home;

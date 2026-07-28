import styles from "./TrackList.module.scss";

function TrackItemShimmering() {
  return (
    <div className={`${styles.trackItemShimmering} ${styles.gridItem}`}>
      <div className={styles.colNumber}>
        <div />
      </div>
      <div className={styles.colTitle}>
        <div />
        <div />
      </div>
      <div className={styles.colDuration}>
        <div />
      </div>
    </div>
  );
}

export default TrackItemShimmering;

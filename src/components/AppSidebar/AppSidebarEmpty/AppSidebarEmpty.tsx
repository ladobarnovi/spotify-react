import styles from "./AppSidebarEmpty.module.scss"

function AppSidebarEmpty() {
  return (
    <div className={styles.appSidebarEmpty}>
      <div className={styles.top} />
      <div className={styles.bottom} />
    </div>
  )
}

export default AppSidebarEmpty;

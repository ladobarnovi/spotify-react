import styles from "./AppFooter.module.scss";

const FOOTER_SECTIONS = [
  {
    title: "Company",
    arrItems: [
      {
        title: "About",
        url: "/",
      },
      {
        title: "Jobs",
        url: "/",
      },
      {
        title: "For the Record",
        url: "/",
      },
    ]
  },
  {
    title: "Communities",
    arrItems: [
      {
        title: "For Artists",
        url: "/",
      },
      {
        title: "Developers",
        url: "/",
      },
      {
        title: "Advertising",
        url: "/",
      },
      {
        title: "Investors",
        url: "/",
      },
      {
        title: "Vendors",
        url: "/",
      },
    ]
  },
  {
    title: "Useful links",
    arrItems: [
      {
        title: "Support",
        url: "/",
      },
      {
        title: "Free Mobile App",
        url: "/",
      },
    ]
  }
]

function AppFooter() {
  const elColumns = FOOTER_SECTIONS.map((section, sectionIndex) => {
    const elLinks = section.arrItems.map((item, itemIndex) => (
      <a target="_blank" href={item.url} rel="noreferrer" key={`${sectionIndex}_${itemIndex}`}>{ item.title }</a>
    ))

    return (
      <div key={sectionIndex} className={styles.col}>
        <p className={styles.title}>{ section.title }</p>
        { elLinks }
      </div>
    )
  })

  return (
    <div className={styles.appFooter}>
      <div className={styles.navContainer}>
        { elColumns }
      </div>
    </div>
  );
}

export default AppFooter;

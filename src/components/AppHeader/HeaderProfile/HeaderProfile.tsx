import styles from "./HeaderProfile.module.scss"
import { useAuth } from "hooks/useAuth";
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";

function HeaderProfile() {
  const { user } = useAuth();

  const profileImage = user?.images[0].url;
  const userName = user?.display_name;

  const contextMenuOptions: IContextMenuOptions = {
    alignment: "right",
    arrSections: [
      {
        arrItems: [
          {
            title: "Account",
            onClick: () => {}
          },
          {
            title: "Profile",
            onClick: () => {}
          },
          {
            title: "Settings",
            onClick: () => {}
          },
        ]
      },
      {
        arrItems: [
          {
            title: "Log out",
            onClick: () => {},
          }
        ]
      }
    ]
  }

  return (
    <div className={styles.headerProfile}>
      <ContextMenu options={contextMenuOptions}>
        <div className={styles.profile}>
          <img src={profileImage} alt={userName} />
        </div>
      </ContextMenu>
    </div>
  )
}

export default HeaderProfile;

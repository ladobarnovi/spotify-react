import styles from "./HeaderProfile.module.scss"
import { useAuth } from "context/AuthContext";
import ContextMenu, { IContextMenuOptions } from "components/ContextMenu/ContextMenu";
import { AUTH_TOKEN_KEY } from "utils/auth";
import { useNavigate } from "react-router-dom";

function HeaderProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profileImage = user?.images[0].url;
  const userName = user?.display_name;

  function logout(): void {
    localStorage.setItem(AUTH_TOKEN_KEY, "");
    window.location.href = "/login";
  }

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
            onClick: () => navigate(`/user/${user?.id}`)
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
            onClick: logout,
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

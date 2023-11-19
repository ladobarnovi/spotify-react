import styles from "./ContextMenu.module.scss"
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TAlignment = "left" | "right";

export interface IContextMenuItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  closeOnAction?: boolean;
  icon?: ReactNode;
}

export interface IContextMenuSection {
  title?: string;
  arrItems: IContextMenuItem[];
}

export interface IContextMenuOptions {
  alignment: TAlignment;
  arrSections: IContextMenuSection[];
}

interface IProps {
  options: IContextMenuOptions;
  children: ReactNode;
  onMenuToggled?: (status: boolean) => void;
}

function ContextMenu({ options, children, onMenuToggled }: IProps) {
  const [ isMenuActive, setIsMenuActive ] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleMenu() {
    const newState = !isMenuActive;
    setIsMenuActive(newState);

    if (onMenuToggled != null) {
      onMenuToggled(newState);
    }
  }

  useEffect(() => {
    if (contentRef.current == null || menuRef.current == null) return;

    const { top, left, width: contentWidth, height: contentHeight } = contentRef.current.getBoundingClientRect();
    const { width: menuWidth } = menuRef.current.getBoundingClientRect();

    let posX = left;
    let posY = top + contentHeight;

    if (options.alignment === "right") {
      posX = posX + contentWidth - menuWidth;
    }
    else if (options.alignment === "left") {
      //
    }

    menuRef.current.style.top = `${posY}px`;
    menuRef.current.style.left = `${posX}px`;
  }, [ isMenuActive ])

  const elSections = options.arrSections.map((section) => (
    <ContextMenuSection
      arrItems={section.arrItems}
      title={section.title}
      onClose={toggleMenu}
    />
  ));

  const elPortalMenu = isMenuActive ? createPortal((
    <div ref={menuRef} className={styles.menu}>
      { elSections }
    </div>
  ), document.body) : null;

  return (
    <div className={ styles.contextMenu }>
      <div
        onClick={toggleMenu}
        tabIndex={1}
        ref={contentRef}
      >
        { children }
      </div>

      { elPortalMenu }
    </div>
  )
}

interface IContextMenuSectionProps extends IContextMenuSection {
  onClose: () => void
}

function ContextMenuSection({ title, arrItems, onClose }: IContextMenuSectionProps) {
  const elTitle = title == null ? null : <p className={styles.sectionTitle}>{ title }</p>

  function onMenuItemClick(item: IContextMenuItem) {
    if (item.isActive) {
      return;
    }

    item.onClick();

    if (item.closeOnAction) {
      onClose();
    }
  }

  const elItems = arrItems.map((item) => {
    return (
      <button
        className={`${styles.sectionItem} ${item.isActive ? styles.active : ""}`}
        onClick={() => onMenuItemClick(item)}
      >
        { item.icon }
        <span>{ item.title }</span>
      </button>
    )
  })

  return (
    <div className={styles.section}>
      { elTitle }
      <div className={styles.sectionItems}>
        { elItems }
      </div>
    </div>
  );
}

export default ContextMenu;

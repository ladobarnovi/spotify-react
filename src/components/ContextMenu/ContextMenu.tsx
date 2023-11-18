import styles from "./ContextMenu.module.scss"
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TAlignment = "left" | "right";

export interface IContextMenuItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
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
}

function ContextMenu({ options, children }: IProps) {
  const [ isMenuActive, setIsMenuActive ] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
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

interface IContextMenuSectionProps extends IContextMenuSection {}

function ContextMenuSection({ title, arrItems }: IContextMenuSectionProps) {
  const elTitle = title == null ? null : <p className={styles.sectionTitle}>{ title }</p>

  const elItems = arrItems.map((item) => {
    return (
      <button
        className={styles.sectionItem}
        onClick={item.onClick}
      >
        { item.title }
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

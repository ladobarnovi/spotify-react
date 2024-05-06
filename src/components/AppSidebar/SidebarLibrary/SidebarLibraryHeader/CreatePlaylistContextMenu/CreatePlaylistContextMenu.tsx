import ContextMenu, { IContextMenuOptions } from "../../../../ContextMenu/ContextMenu";
import { ReactNode } from "react";
import IconAddNote from "components/Icons/IconAddNote";
import IconFolder from "../../../../Icons/IconFolder";

interface IProps {
  children: ReactNode;
}
export default function CreatePlaylistContextMenu({ children }: IProps) {
  const contextMenuOptions: IContextMenuOptions = {
    alignment: "left",
    arrSections: [
      {
        arrItems: [
          {
            title: "Create a new playlist",
            onClick: () => {},
            icon: <IconAddNote />
          },
          {
            title: "Add a new folder",
            onClick: () => {},
            icon: <IconFolder />
          }
        ]
      },
    ]
  }

  return (
    <ContextMenu options={contextMenuOptions}>
      { children }
    </ContextMenu>
  )
}
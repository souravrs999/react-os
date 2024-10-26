import { HTMLAttributes, FC } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type DisplayContextMenuProps = HTMLAttributes<HTMLDivElement> & {};
const DisplayContextMenu: FC<DisplayContextMenuProps> = (props) => {
  const { children } = props;
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Display Settings</ContextMenuItem>
        <ContextMenuItem>Change Background..</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
export default DisplayContextMenu;

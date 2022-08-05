import { createSignal } from "solid-js";
import { MousePosition } from "../types";
import { stopEvent } from "../utils/stopEvent";

const createContextMenu = (elementRef: HTMLElement) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = createSignal(false);
  const [contextMenuPosition, setContextMenuPosition] = createSignal<
    MousePosition | undefined
  >(undefined);

  const handleContextMenu = (e: MouseEvent) => {
    setIsContextMenuOpen(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    stopEvent(e);
  };

  const handleContextMenuClose = () => {
    setIsContextMenuOpen(false);
  };

  const handleContextMenuHide = () => {
    setContextMenuPosition(undefined);
  };

  return {
    isOpen: isContextMenuOpen,
    position: contextMenuPosition,
    open: handleContextMenu,
    close: handleContextMenuClose,
    hide: handleContextMenuHide,
  };
};

export default createContextMenu;

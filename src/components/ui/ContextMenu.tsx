import { Component } from "solid-js";
import { Portal } from "solid-js/web";
import { MousePosition } from "../../types";

const ContextMenu: Component<{ position: MousePosition }> = ({ position }) => {
  return (
    <Portal>
      <div>menu</div>
    </Portal>
  );
};

export default ContextMenu;

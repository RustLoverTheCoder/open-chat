import { Component } from "solid-js";

const Header: Component<{ title: string }> = ({ title }) => {
  return (
    <div
      class="h-7 w-full flex justify-center items-center bg-base-100"
      data-tauri-drag-region
    >
      <div class="text-sm font-medium pointer-events-none">{title}</div>
    </div>
  );
};

export default Header;

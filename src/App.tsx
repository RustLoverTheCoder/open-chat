import { Component, createEffect } from "solid-js";
import { window } from "@tauri-apps/api";
import Header from "./components/ui/header";
import Left from "./components/ui/left";
import Middle from "./components/ui/Middle";

const App: Component = () => {
  createEffect(() => {
    const win = window.getCurrent();
    win.show();
  }, []);
  return (
    <>
      <Header title="Telegram" />
      <div class="flex w-full h-full">
        <Left />
        <Middle />
      </div>
    </>
  );
};

export default App;

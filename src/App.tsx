import { Component, createEffect, createSignal } from "solid-js";
import { window } from "@tauri-apps/api";
import Header from "./components/ui/header";
import Search from "./components/icons/search";
import UserCircle from "./components/icons/userCircle";
import Cog from "./components/icons/cog";
import ChatAlt from "./components/icons/chatAlt";
import Check from "./components/icons/check";
import Input from "./components/editor";

const App: Component = () => {
  let messageContainerRef: HTMLDivElement;
  const [num, setNum] = createSignal(100);
  createEffect(() => {
    const win = window.getCurrent();
    win.show();
    messageContainerRef.scrollTop = messageContainerRef.scrollHeight;
  }, []);

  return (
    <div class="w-full h-full flex flex-col">
      <Header title="Telegram" />
      {/* left */}
      <div class="flex flex-1 bg-base-300">
        <div
          class="w-full sm:w-80 sm:border-r flex flex-col justify-between"
          style={{ "border-color": "#ffffff10" }}
        >
          <div class="w-full px-4 py-2">
            <div class="w-full rounded-lg h-8 flex items-center bg-gray-600 px-3">
              <Search class="w-5 h-5 mr-2" />
              <input
                type="text"
                class="bg-transparent outline-none h-8 flex-1 text-white text-sm"
                placeholder="搜索"
              />
            </div>
          </div>
          <div class="flex-1 relative">
            <div class="absolute top-0 right-0 left-0 bottom-0 overflow-y-auto overflow-x-hidden">
              {Array.from(new Array(20)).map((_, i) => (
                <div class="w-full px-2 h-auto">
                  <div class="h-16 w-full px-2 flex items-center space-x-2 rounded-lg cursor-pointer hover:bg-white/10">
                    <img
                      src="https://avatar.shuocdn.com/raw/11161/8bc6b3ab11ffe3380111e65a4693c20f.jpg?x-oss-process=style/thumbnail&v=0902"
                      alt=""
                      class="w-12 h-12 rounded-full"
                    />
                    <div class="flex flex-col justify-center items-start flex-1">
                      <div class="flex items-center justify-between w-full">
                        <div class="flex-1 relative">
                          <div class="absolute top-0 right-0 bottom-0 left-0 truncate text-white text-base">
                            奥斯卡奥斯卡奥斯卡奥斯卡奥斯卡
                          </div>
                          <div>{"\u00A0"}</div>
                        </div>
                        <Check class="w-4 h-4" />
                      </div>
                      <div class="text-sm">Sticker</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="flex items-center justify-around h-12">
            <ChatAlt class="w-6 h-6 text-white cursor-pointer" />
            <UserCircle class="w-6 h-6 text-white/40 cursor-pointer" />
            <Cog class="w-6 h-6 text-white/40 cursor-pointer" />
          </div>
        </div>
        {/* Middle transition-transform sm:transition-none duration-300 sm:duration-[0ms] translate-x-screen sm:translate-x-0 */}
        <div class="hidden sm:flex-1 sm:flex flex-col bg-base-200">
          <div class="w-full h-12 flex items-center border-b border-white/10">
            <div class="w-full flex justify-between items-center px-4">
              <div
                class="text-lg font-semibold text-white"
                onClick={() => {
                  setNum((old) => old + 1);
                  messageContainerRef.scrollTop =
                    messageContainerRef.scrollHeight;
                }}
              >
                王者上分群
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="flex-1 relative">
              <div
                ref={messageContainerRef}
                class="absolute top-0 right-0 bottom-0 left-0 mb-2 overflow-y-scroll overflow-x-hidden"
              >
                <div class="message-container w-full min-h-full flex flex-col justify-end">
                  {Array.from(new Array(num())).map((_, i) => (
                    <div class="" style={{ "min-height": "40px" }}>
                      <div>{i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Input placeholder="给@奥斯卡私信" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

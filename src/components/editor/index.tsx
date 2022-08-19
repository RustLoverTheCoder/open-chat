import { Component, createEffect, lazy } from "solid-js";
import Happy from "../icons/happy";
import PlusCircle from "../icons/plusCircle";
import { createTiptapEditor } from "solid-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
//@ts-ignore
import Image from "@tiptap/extension-image";

const EmojiPickerComponent = lazy(() => import("../ui/EmojiPicker"));

interface Props {
  placeholder: string;
  onSend: (value: string) => void;
}

const Input: Component<Props> = ({ placeholder, onSend }) => {
  let inputRef: HTMLDivElement;

  const editor = createTiptapEditor({
    get element() {
      return inputRef;
    },
    get extensions() {
      return [StarterKit, Image, Placeholder];
    },
    content: ``,
    autofocus: true,
  });

  createEffect(() => {
    const instance = editor();
    if (instance) {
      console.log("instance", instance);
    }
  });

  return (
    <div class="w-full pb-5 px-4">
      <div
        class="w-full min-h-[14] flex items-end bg-base-300 rounded-xl"
        onContextMenu={undefined}
      >
        <div class="dropdown dropdown-top">
          <label
            tabindex="0"
            class="w-14 h-14 cursor-pointer flex justify-center items-center group"
            onChange={(e) => console.log("1")}
          >
            <Happy class="w-6 h-6 text-white/50 group-hover:text-white" />
          </label>
          <div
            tabindex="0"
            class="dropdown-content card shadow bg-base-100 rounded-box w-[424px]"
          >
            <div>123123</div>
            <EmojiPickerComponent />
          </div>
        </div>
        <div
          id="editor"
          ref={inputRef}
          class="flex-1 text-white outline-none text-base py-4"
          style={{ "caret-color": "white" }}
        />
        <div class="dropdown dropdown-top dropdown-end">
          <label
            tabindex="0"
            class="w-14 h-14 cursor-pointer flex justify-center items-center group"
          >
            <PlusCircle class="w-6 h-6 text-white/50 group-hover:text-white" />
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 mb-2"
          >
            <li>
              <a>照片、视频</a>
            </li>
            <li>
              <a>文件</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Input;

import { Component, lazy } from "solid-js";
import Happy from "../icons/happy";
import PlusCircle from "../icons/plusCircle";
import "./index.css";

const EmojiPickerComponent = lazy(() => import("../ui/EmojiPicker"));

interface Props {
  placeholder: string;
  onSend: (value: string) => void;
}

const Input: Component<Props> = ({ placeholder, onSend }) => {
  let inputRef: HTMLDivElement;

  const focusInput = () => {
    inputRef?.focus();
  };

  const handleChange = (e) => {
    const { innerHTML, textContent } = e.currentTarget;
    console.log("innerHTML", innerHTML);
    if (textContent === "") {
      inputRef.innerHTML = "";
    }
  };

  const handleBlur = () => {
    console.log("blur");
  };

  const handleFocusOut = () => {
    console.log("focusout");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputRef.textContent) {
        onSend(inputRef.innerText);
      }
      clearInputValue();
    }
  };

  const clearInputValue = () => {
    inputRef.innerHTML = "";
  };

  return (
    <div class="w-full pb-5 px-4">
      <div
        class="w-full min-h-[14] flex items-center bg-base-300 rounded-xl"
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
          ref={inputRef}
          contentEditable
          dir="auto"
          class="content-editable-input flex-1 text-white outline-none text-base font-normal py-4"
          style={{ "caret-color": "white" }}
          onClick={focusInput}
          onInput={handleChange}
          onBlur={handleBlur}
          onFocusOut={handleFocusOut}
          onKeyDown={handleKeyDown}
          aria-label={placeholder}
        />
        <div class="dropdown dropdown-top dropdown-hover dropdown-end">
          <label
            tabindex="0"
            class="w-14 h-14 cursor-pointer flex justify-center items-center group"
          >
            <PlusCircle class="w-6 h-6 text-white/50 group-hover:text-white" />
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
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

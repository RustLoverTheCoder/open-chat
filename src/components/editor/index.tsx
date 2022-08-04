import { Component } from "solid-js";
import Happy from "../icons/happy";
import PlusCircle from "../icons/plusCircle";
import "./index.css";

interface Props {
  placeholder: string;
  onSend: (value: string) => void;
}

const Input: Component<Props> = ({ placeholder, onSend }) => {
  let inputRef: HTMLDivElement;

  const focusInput = () => {
    inputRef?.focus();
  };

  const handleChange = (e: { currentTarget: HTMLInputElement }) => {
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
      onSend(inputRef.innerText);
      clearInputValue();
    }
  };

  const clearInputValue = () => {
    inputRef.innerHTML = "";
  };

  return (
    <div class="w-full pb-5 px-4">
      <div
        class="w-full min-h-[14] flex items-center bg-base-300 overflow-hidden rounded-xl"
        onContextMenu={undefined}
      >
        <div class="w-14 h-14 cursor-pointer flex justify-center items-center">
          <Happy class="w-6 h-6 text-white/50 hover:text-white" />
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
        <div class="w-14 h-14 cursor-pointer flex justify-center items-center">
          <PlusCircle class="w-6 h-6 text-white/50 hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Input;

import { Component, onMount, Show } from "solid-js";
import { Message as MessageType } from "../../types";
import { formatDate, formatTime } from "../../utils/dateFormat";
import createContextMenu from "../../hooks/createContextMenu";
import ContextMenu from "./ContextMenu";
import Avatar from "./Avatar";

const Message: Component<{ message: MessageType; showAvatar: boolean }> = ({
  message,
  showAvatar = true,
}) => {
  let messageRef: HTMLDivElement;

  const { isOpen, open, close, hide, position } = createContextMenu(messageRef);

  onMount(() => console.log("messageRef", messageRef));

  return (
    <div
      class="pr-4 pl-[72px] w-full flex items-end hover:bg-base-300 relative mt-1"
      ref={messageRef}
      onContextMenu={open}
    >
      <Show when={showAvatar}>
        <Avatar
          type="circle"
          url="https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg"
          Class="absolute left-4 top-0.5"
        />
      </Show>
      <Show when={!showAvatar}>
        <span class="absolute left-0 top-0 h-14 text-xs">
          {formatTime(message.date)}
        </span>
      </Show>
      <p class="text-15" style={{ "white-space": "pre-wrap" }}>
        <Show when={showAvatar}>
          <span class="text-white">
            奥斯卡奥斯卡奥斯卡奥斯卡奥斯卡
            <span class="text-xs text-base-content ml-2">
              {formatDate(message.date)}
            </span>
          </span>
          <br />
        </Show>
        {message.content?.text}
      </p>
      <Show when={isOpen()}>
        <ContextMenu position={position()} />
      </Show>
    </div>
  );
};

export default Message;

import { Component, For } from "solid-js";
import { messages } from "../../stores";
import { formatTime, formatDate } from "../../utils/dateFormat";
import Message from "./Message";

const MessageList: Component = () => {
  // 根据日期分组
  // 再根据 人物分组
  // 再根据人物的消息时间间距分钟

  return (
    <For each={messages}>
      {(messageItem) => <Message message={messageItem} showAvatar={true} />}
    </For>
  );
};

export default MessageList;

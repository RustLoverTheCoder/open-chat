import { Component, For, createEffect, createMemo } from "solid-js";
import { messages } from "../../stores";
import { formatTime, formatDate } from "../../utils/dateFormat";
import { groupMessages } from "../../utils/groupMessages";
import Message from "./Message";

const MessageList: Component = () => {
  // 根据日期分组
  // 再根据 人物分组
  // 再根据人物的消息时间间距分钟

  const groupMessageList = createMemo(() => {
    return groupMessages(messages)
  }, [messages.length])

  return (
    <For each={groupMessageList()}>
      {(dateGroup: any[]) => {
        return (
          <div class="flex flex-col justify-end w-full">
            <For each={dateGroup}>
              {(messageItem) => <Message message={messageItem} showAvatar={messageItem.preSenderId !== messageItem.senderId} />}
            </For>
          </div>
        )
      }}
    </For>
  );
};

export default MessageList;

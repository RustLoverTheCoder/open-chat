import { Component, For, createMemo } from "solid-js";
import { messages } from "../../stores";
import { formatDateSeparator } from "../../utils/dateFormat";
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
          <div class="flex flex-col justify-start items-start w-full h-auto">
            <div class="text-13 w-full text-center my-1.5">
              {formatDateSeparator(dateGroup[0].date)}
            </div>
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

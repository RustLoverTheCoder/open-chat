import { Component } from "solid-js";
import { Message } from "../../types";
import { formatDate } from "../../utils/dateFormat";

interface Props {
  message: Message;
}

const Message: Component<Props> = ({ message }) => {
  return (
    <div class="pr-4 pl-[72px] w-full flex items-end hover:bg-base-300 relative mt-4">
      <img
        src="https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg"
        alt=""
        class="w-10 h-10 rounded-full absolute left-4 top-0.5"
      />
      {/* <span class="absolute left-0 top-0 h-14 text-xs">
    {formatTime(messageItem.date)}
  </span> */}
      <p class="text-15" style={{ "white-space": "pre-wrap" }}>
        <span class="text-white">
          奥斯卡奥斯卡奥斯卡奥斯卡奥斯卡
          <span class="text-xs text-base-content ml-2">
            {formatDate(message.date)}
          </span>
        </span>
        <br />
        {message.content?.text}
      </p>
    </div>
  );
};

export default Message;

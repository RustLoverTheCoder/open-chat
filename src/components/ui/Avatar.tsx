import { Component } from "solid-js";

const Avatar: Component<{
  type: "squircle" | "circle";
  url: string;
  Class: string;
}> = (props) => {
  const { url, type, Class } = props;
  return (
    <div class={`avatar ${Class}`}>
      <div class="w-10 rounded-full">
        <img src={url} />
      </div>
    </div>
  );
};

export default Avatar;

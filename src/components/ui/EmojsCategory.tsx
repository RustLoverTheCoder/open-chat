import { Component, For, Show } from "solid-js";
import { AllEmojis, EmojiCategoryData } from "../../types";

const EmojsCategory: Component<{
  category: EmojiCategoryData;
  allEmojis: AllEmojis;
  onEmojiSelect: (category: EmojiCategoryData) => void;
}> = ({ category, allEmojis, onEmojiSelect }) => {
  return (
    <div>
      <Show when={Array.isArray(category.name) && category.name.length > 0}>
        <div class="w-full px-2">
          <p>{category.name[0]}</p>
        </div>
      </Show>
      <div class="flex flex-wrap justify-center items-center">
        <For each={category.emojis}>
          {(name) => {
            const emoji = allEmojis[name];
            if (!emoji) {
              return undefined;
            }
            return <button class="btn btn-sm btn-ghost btn-square">1</button>;
          }}
        </For>
      </div>
    </div>
  );
};

export default EmojsCategory;

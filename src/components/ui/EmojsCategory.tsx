import { Component, For, Show, lazy, Suspense } from "solid-js";
import { AllEmojis, EmojiCategoryData } from "../../types";
// import { getSrc } from "../../utils/getSrc";

// const RenderImage = lazy(async () => {
//   const res = await getSrc();
//   return <button class="btn btn-sm btn-ghost btn-square">1</button>;
// });

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
            return (
              <Suspense fallback={<p>Loading...</p>}>
                {/* <RenderImage name={"123"} /> */}
              </Suspense>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default EmojsCategory;

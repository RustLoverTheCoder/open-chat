import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import {
  AllEmojis,
  EmojiCategoryData,
  EmojiData,
  EmojiModule,
  EmojiRawData,
} from "../../types";
import { uncompressEmoji } from "../../utils/emoji";
import EmojsCategory from "./EmojsCategory";

const ICONS_BY_CATEGORY: Record<string, string> = {
  recent: "icon-recent",
  people: "icon-smile",
  nature: "icon-animals",
  foods: "icon-eats",
  activity: "icon-sport",
  places: "icon-car",
  objects: "icon-lamp",
  symbols: "icon-language",
  flags: "icon-flag",
};

let emojiDataPromise: Promise<EmojiModule>;
let emojiRawData: EmojiRawData;
let emojiData: EmojiData;

async function ensureEmojiData() {
  if (!emojiDataPromise) {
    emojiDataPromise = import("emoji-data-ios/emoji-data.json");
    emojiRawData = (await emojiDataPromise).default;

    emojiData = uncompressEmoji(emojiRawData);
  }

  return emojiDataPromise;
}

const EmojsPicker: Component = () => {
  const [categories, setCategories] = createSignal<EmojiCategoryData[]>();
  const [emojis, setEmojis] = createSignal<AllEmojis>();

  createEffect(() => {
    setTimeout(() => {
      const exec = () => {
        setCategories(emojiData.categories);

        setEmojis(emojiData.emojis as AllEmojis);
      };

      if (emojiData) {
        exec();
      } else {
        ensureEmojiData().then(exec);
      }
    }, 200);
  }, []);

  return (
    <div class="flex flex-col w-full h-auto">
      <div class="w-full h-[23.25rem] flex flex-col">
        <div class="bg-base-300 h-12 w-full">
          <For each={categories()}>
            {(category) => {
              const icon = ICONS_BY_CATEGORY[category.id];
              return <span>{icon}</span>;
            }}
          </For>
        </div>
        <div class="w-full overflow-x-hidden overflow-y-auto flex-1 relative hidden-scrollbar">
          <Show when={emojis()}>
            <For each={categories()}>
              {(category) => {
                return (
                  <EmojsCategory
                    category={category}
                    allEmojis={emojis()}
                    onEmojiSelect={(e) => console.log("e", e)}
                  />
                );
              }}
            </For>
          </Show>
        </div>
      </div>
      <div class="bg-base-300 h-12 w-full"></div>
    </div>
  );
};

export default EmojsPicker;

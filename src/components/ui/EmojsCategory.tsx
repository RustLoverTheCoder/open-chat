import { Component, For, Show, lazy, Suspense } from 'solid-js'
import { AllEmojis, EmojiCategoryData } from '../../types'

const EmojsCategory: Component<{
  category: EmojiCategoryData;
  allEmojis: AllEmojis;
  onEmojiSelect: (category: EmojiCategoryData) => void;
}> = ({ category, allEmojis, onEmojiSelect }) => {
  return (
    <div>
      <Show when={Array.isArray(category.name) && category.name.length > 0}>
        <div class='w-full px-2'>
          <p>{category.name[0]}</p>
        </div>
      </Show>
      <div class='flex flex-wrap justify-center items-center'>
        <For each={category.emojis}>
          {(name) => {
            const emoji = allEmojis[name]
            if (!emoji) {
              return undefined
            }
            return (
              <Suspense fallback={<div />}>
                <button class='btn btn-sm btn-ghost btn-square'>
                  <img
                    src={`https://raw.githubusercontent.com/korenskoy/emoji-data-ios/master/img-apple-64/${emoji?.image}.png`}
                    alt='' class='w-6 h-6' />
                </button>
              </Suspense>
            )
          }}
        </For>
      </div>
    </div>
  )
}

export default EmojsCategory

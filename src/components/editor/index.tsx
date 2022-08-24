import { Component, createEffect, lazy, Show } from 'solid-js'
import Happy from '../icons/happy'
import PlusCircle from '../icons/plusCircle'
import { createTiptapEditor } from 'solid-tiptap'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
//@ts-ignore
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'

const EmojiPickerComponent = lazy(() => import('../ui/EmojiPicker'))

interface Props {
  placeholder: string;
  onSend: (value: string) => void;
}

const Input: Component<Props> = ({ placeholder, onSend }) => {
  let inputRef: HTMLDivElement
  let emojiContainerRef: HTMLDivElement


  const CustomBulletList = BulletList.extend({
    addKeyboardShortcuts() {
      return {
        // ↓ your new keyboard shortcut
        'Enter': ({ editor }) => {
          /// 发送
          /// 删除内容 
          onSend(editor.getText())
          editor.commands.clearContent(true)
          return true
        }
      }
    }
  })


  const editor = createTiptapEditor({
    get element() {
      return inputRef
    },
    get extensions() {
      return [
        StarterKit,
        Image,
        CustomBulletList,
        Placeholder
      ]
    },
    autofocus: true
  })

  createEffect(() => {
    const instance = editor()
    if (instance) {
      console.log('instance', instance)
    }
  })

  return (
    <div class='w-full pb-5 px-4'>
      <div
        class='w-full min-h-[14] flex items-start bg-base-300 rounded-xl'
        onContextMenu={undefined}
      >
        <div class='dropdown dropdown-top'>
          <label
            tabindex='0'
            class='w-14 h-14 cursor-pointer flex justify-center items-center group'
            onChange={(e) => console.log('1')}
          >
            <Happy class='w-6 h-6 text-white/50 group-hover:text-white' />
          </label>
          <div
            tabindex='0'
            class='dropdown-content card shadow bg-base-100 rounded-box sm:w-[424px] w-[calc(100vw-32px)] mb-2'
          >
            <EmojiPickerComponent />
          </div>
        </div>
        <div
          id='editor'
          ref={inputRef}
          data-placeholder={placeholder}
          class='flex-1 text-white outline-none text-base py-4'
        />
        <div class='dropdown dropdown-top dropdown-end'>
          <label
            tabindex='0'
            class='w-14 h-14 cursor-pointer flex justify-center items-center group'
          >
            <PlusCircle class='w-6 h-6 text-white/50 group-hover:text-white' />
          </label>
          <ul
            tabindex='0'
            class='dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 mb-2'
          >
            <li>
              <a>照片、视频</a>
            </li>
            <li>
              <a>文件</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Input

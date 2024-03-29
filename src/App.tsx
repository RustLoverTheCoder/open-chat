import { Component, createSignal, For, onMount, Show } from 'solid-js'
import { window } from '@tauri-apps/api'
import Header from './components/ui/header'
import Search from './components/icons/search'
import UserCircle from './components/icons/userCircle'
import Cog from './components/icons/cog'
import ChatAlt from './components/icons/chatAlt'
import Check from './components/icons/check'
import Input from './components/editor'
import { Transition } from 'solid-transition-group'
import MessageList from './components/ui/MessageList'
import { setMessages } from './stores'
import { now } from './utils/dateFormat'
import { Tab as TabType } from './types/index'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { activeChannel, setActiveChannel } from './stores'
import ChevronLeft from './components/icons/chevronLeft'
import MoreHorizontal from './components/icons/moreHorizontal'

const App: Component = () => {
  const [tab, setTab] = createSignal<TabType>('chat')
  let messageContainerRef: HTMLDivElement
  let containerRef: HTMLDivElement
  onMount(() => {
    const win = window.getCurrent()
    win.show()
    messageContainerRef.scrollTop = messageContainerRef.scrollHeight
  })

  // document.addEventListener("contextmenu", (event) => event.preventDefault());
  // onCleanup(() => {
  //   document.removeEventListener("contextmenu", (event) =>
  //     event.preventDefault()
  //   );
  // });

  const handleSend = (value) => {
    setMessages((old) => [...old, { content: { text: value }, date: now(), senderId: 1 }])
    setTimeout(() => {
      messageContainerRef.scrollTo({
        top: messageContainerRef.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  const ChatTab = () => {
    const rowVirtualizer = createVirtualizer({
      count: 200,
      getScrollElement: () => containerRef,
      estimateSize: () => 64
    })

    return (
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        <For each={rowVirtualizer.getVirtualItems()}>
          {(virtualItem: { end: number; index: number; key: number; size: number; start: number }) => {
            return (
              <div
                class='w-full px-2'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem?.size}px`,
                  transform: `translateY(${virtualItem?.start}px)`
                }}
                onClick={() => setActiveChannel({ id: String(virtualItem.index), name: '123' })}
              >
                <div
                  class={`h-16 w-full px-2 flex items-center space-x-2 rounded-lg cursor-pointer hover:bg-white/10 group chat-item ${Number(activeChannel.id) == virtualItem.index}`}>
                  <div class='avatar mask mask-squircle group-hover:rounded-none'>
                    <div class='w-12 h-12'>
                      <img src='https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg'
                           class='' />
                    </div>
                  </div>

                  <div class='flex flex-col justify-center items-start flex-1'>
                    <div class='flex items-center justify-between w-full'>
                      <div class='flex-1 relative'>
                        <div
                          class='absolute top-0 right-0 bottom-0 left-0 truncate text-white text-base'>奥斯卡奥斯卡奥斯卡奥斯卡奥斯卡
                        </div>
                        <div>{'\u00A0'}</div>
                      </div>
                      <Check class='w-4 h-4' />
                    </div>
                    <div class='text-sm'>Sticker</div>
                  </div>
                </div>
              </div>
            )
          }}
        </For>
      </div>
    )
  }

  const ContactsTab = () => {
    const rowVirtualizer = createVirtualizer({
      count: 200,
      getScrollElement: () => containerRef,
      estimateSize: () => 64
    })

    return (
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        <For each={rowVirtualizer.getVirtualItems()}>
          {(virtualItem: any) => {
            return (
              <div
                class='w-full px-2'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem?.size}px`,
                  transform: `translateY(${virtualItem?.start}px)`
                }}
              >
                <div class='h-16 w-full px-2 flex items-center space-x-2 rounded-lg cursor-pointer hover:bg-white/10'>
                  <img src='https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg' alt=''
                       class='w-12 h-12 mask mask-squircle' />
                  <div class='flex flex-col justify-center items-start flex-1'>
                    <div class='flex items-center justify-between w-full'>
                      <div class='flex-1 relative'>
                        <div
                          class='absolute top-0 right-0 bottom-0 left-0 truncate text-white text-base'>奥斯卡奥斯卡奥斯卡奥斯卡奥斯卡
                        </div>
                        <div>{'\u00A0'}</div>
                      </div>
                    </div>
                    <div class='text-sm'>在线</div>
                  </div>
                </div>
              </div>
            )
          }}
        </For>
      </div>
    )
  }

  const SettingTab = () => {
    return (
      <div class='flex-1 w-full relative'>
        <div class='absolute top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-auto'>
          <div class='w-full h-6' />
          <div class='flex justify-center items-center'>
            <img src='https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg' alt=''
                 class='w-1/4 mask mask-circle select-none' />
          </div>
          <div class='w-full px-4 relative h-auto mt-6'>
            <ul class='menu bg-base-100 w-full rounded-box text-sm text-white'>
              <li>
                <a>保存消息</a>
              </li>
              <li>
                <a>最近通话</a>
              </li>
              <li>
                <a>设备管理</a>
              </li>
              <li>
                <a>聊天组管理</a>
              </li>
            </ul>
          </div>
          <div class='w-full px-4 relative h-auto mt-6'>
            <ul class='menu bg-base-100 w-full rounded-box text-white'>
              <li>
                <a>通知、声音</a>
              </li>
              <li>
                <a>隐私、安全</a>
              </li>
              <li>
                <a>数据、存储</a>
              </li>
              <li>
                <a>应用设置</a>
              </li>
              <li>
                <a>语言</a>
              </li>
              <li>
                <a>表情</a>
              </li>
            </ul>
          </div>
          <div class='w-full px-4 relative h-auto mt-6'>
            <ul class='menu bg-base-100 w-full rounded-box text-white'>
              <li>
                <a>高级会员</a>
              </li>
            </ul>
          </div>
          <div class='w-full px-4 relative h-auto mt-6'>
            <ul class='menu bg-base-100 w-full rounded-box text-white'>
              <li>
                <a>反馈</a>
              </li>
              <li>
                <a>功能</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div class='w-full h-full flex flex-col'>
      <Header title='Telegram' />
      {/* left */}
      <div class='flex flex-1 bg-base-300'>
        <div class='w-full sm:w-80 sm:border-r flex flex-col justify-between' style={{ 'border-color': '#ffffff10' }}>
          <Show when={tab() === 'settings'}>
            <SettingTab />
          </Show>
          <Show when={tab() === 'chat' || tab() === 'contacts'}>
            <div class='w-full px-4 py-2'>
              <div class='w-full rounded-lg h-8 flex items-center bg-gray-600 px-3'>
                <Search class='w-5 h-5 mr-2' />
                <input type='text' class='bg-transparent outline-none h-8 flex-1 text-white text-sm' placeholder='搜索' />
              </div>
            </div>
            <div class='flex-1 relative'>
              <div class='absolute top-0 right-0 left-0 bottom-0 overflow-y-auto overflow-x-hidden custom-scroll'
                   ref={containerRef}>
                <Show when={tab() === 'chat'}>
                  <ChatTab />
                </Show>
                <Show when={tab() === 'contacts'}>
                  <ContactsTab />
                </Show>
              </div>
            </div>
          </Show>

          <div class='flex items-center justify-around h-12'>
            <Show when={tab() === 'chat'}>
              <ChatAlt class='w-6 h-6 text-white cursor-pointer' />
            </Show>
            <Show when={tab() !== 'chat'}>
              <ChatAlt class='w-6 h-6 text-white/40 cursor-pointer' onClick={() => setTab('chat')} />
            </Show>
            <Show when={tab() === 'contacts'}>
              <UserCircle class='w-6 h-6 text-white cursor-pointer' />
            </Show>
            <Show when={tab() !== 'contacts'}>
              <UserCircle class='w-6 h-6 text-white/40 cursor-pointer' onClick={() => setTab('contacts')} />
            </Show>
            <Show when={tab() === 'settings'}>
              <Cog class='w-6 h-6 text-white cursor-pointer' />
            </Show>
            <Show when={tab() !== 'settings'}>
              <Cog class='w-6 h-6 text-white/40 cursor-pointer' onClick={() => setTab('settings')} />
            </Show>
          </div>
        </div>
        <div
          class={`sm:flex-1 flex flex-col bg-base-200 fixed top-7 sm:top-0 right-0 left-0 bottom-0 sm:relative  transition-transform sm:transition-none duration-200 sm:duration-[0ms] ${
            !activeChannel?.id ? 'translate-x-screen' : 'translate-x-0'
          }  sm:translate-x-0`}
        >
          <Show when={!activeChannel?.id}>
            <div class='flex-1 justify-center items-center hidden sm:flex'>
              <button class='btn'>请选择一个聊天</button>
            </div>
          </Show>
          <Show when={!!activeChannel?.id}>
            <div class='w-full h-12 flex items-center border-b border-white/10'>
              <div class='w-full flex justify-between items-center px-2 sm:px-4'>
                <div class='flex items-center'>
                  <button class='btn btn-ghost btn-square flex sm:hidden hover:bg-transparent btn-sm'
                          onClick={() => setActiveChannel({ id: '', name: '' })}>
                    <ChevronLeft class='w-5 h-5 text-white cursor-pointer' />
                  </button>
                  <div class='text-lg font-semibold text-white'>{activeChannel.name}</div>
                </div>
                <div class='flex items-center'>
                  <button class='btn btn-ghost btn-square flex sm:hidden hover:bg-transparent w-10 h-10'>
                    <Search class='w-6 h-6 text-white cursor-pointer' />
                  </button>
                  <button class='btn btn-ghost btn-square flex sm:hidden hover:bg-transparent w-10 h-10'>
                    <MoreHorizontal class='w-6 h-6 text-white cursor-pointer' />
                  </button>
                </div>
              </div>
            </div>
            <Transition name='fade'>
              <div class='flex-1 flex flex-col'>
                <div class='flex-1 relative'>
                  <div ref={messageContainerRef}
                       class='absolute top-0 right-0 bottom-0 left-0 overflow-y-scroll overflow-x-hidden transition-all mb-4'>
                    <div class='relative w-full min-h-full flex flex-col justify-end shrink-0 overflow-hidden'>
                      <MessageList />
                    </div>
                  </div>
                </div>
                <Input placeholder='给@奥斯卡私信' onSend={handleSend} />
              </div>
            </Transition>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default App

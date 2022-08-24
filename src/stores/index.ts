import {createStore} from "solid-js/store";

export const [messages, setMessages] = createStore([]);
export const [activeChannel, setActiveChannel] = createStore<{ id?: string, name?: string }>({})
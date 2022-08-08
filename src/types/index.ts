export type ThemeKey = "light" | "dark";

interface MessageContent {
  text: string;
}

export interface Message {
  id: number;
  content: MessageContent;
  date: number;
  senderId: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export type Tab = "chat" | "contacts" | "settings";

export interface iconType {
  class: string;
  onClick?: () => void;
}

export type EmojiCategory = {
  id: string;
  name: string;
  emojis: string[];
};

export type Emoji = {
  id: string;
  names: string[];
  native: string;
  image: string;
  skin?: number;
};

export type EmojiData = {
  categories: Array<EmojiCategory>;
  emojis: Record<string, Emoji>;
};

export type EmojiRawData = typeof import("emoji-data-ios/emoji-data.json");

export type EmojiModule = { default: EmojiRawData };

export type EmojiCategoryData = { id: string; name: string; emojis: string[] };

export type EmojiWithSkins = Record<number, Emoji>;

export type AllEmojis = Record<string, Emoji | EmojiWithSkins>;

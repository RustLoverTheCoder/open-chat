export type ThemeKey = "light" | "dark";

interface MessageContent {
  text: string;
}

export interface Message {
  id: number;
  content: MessageContent;
  date: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

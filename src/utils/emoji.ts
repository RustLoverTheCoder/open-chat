import { EmojiCategory, EmojiData, EmojiRawData } from "../types";

const EXCLUDE_EMOJIS = ["female_sign", "male_sign", "medical_symbol"];

function unifiedToNative(unified: string) {
  const unicodes = unified.split("-");
  const codePoints = unicodes.map((i) => parseInt(i, 16));

  return String.fromCodePoint(...codePoints);
}

export function uncompressEmoji(data: EmojiRawData): EmojiData {
  const emojiData: EmojiData = { categories: [], emojis: {} };

  for (let i = 0; i < data.length; i += 2) {
    const category = {
      id: data[i][0],
      name: data[i][1],
      emojis: [],
    } as EmojiCategory;

    for (let j = 0; j < data[i + 1].length; j++) {
      const emojiRaw = data[i + 1][j];
      if (!EXCLUDE_EMOJIS.includes(emojiRaw[1][0])) {
        category.emojis.push(emojiRaw[1][0]);
        emojiData.emojis[emojiRaw[1][0]] = {
          id: emojiRaw[1][0],
          names: emojiRaw[1] as string[],
          native: unifiedToNative(emojiRaw[0] as string),
          image: (emojiRaw[0] as string).toLowerCase(),
        };
      }
    }

    emojiData.categories.push(category);
  }

  return emojiData;
}

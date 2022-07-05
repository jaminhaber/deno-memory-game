import emojis from "./emojis.ts";
import { Card } from "./reducer.ts";

export const spawnDeck = (numCards: number): Card[] => {
  if (numCards % 2 !== 0) numCards -= 1;
  const time = new Date().getTime();
  const emojiStack = Array.from(emojis).sort(() => Math.random() - 0.5);
  const deck: Card[] = Array.from({ length: numCards }, (_, i) => {
    const emoji = emojiStack[Math.floor(i / 2)];
    return { emoji, id: `${i}_${time}` };
  });
  deck.sort(() => Math.random() - 0.5);
  return deck;
};

// deno-lint-ignore-file no-case-declarations
import { spawnDeck } from "./deck.ts";

export type Card = {
  emoji: string;
  id: string;
};

export type GameState = {
  numClicks: number;
  numSolved: number;
  refresh: boolean;
  solved: Set<string>;
  flipped: Set<string>;
  deck: Card[];
  last: Card | null;
  status: "NEW" | "PLAY" | "VICTORY";
};

export type Actions =
  | { type: "new-deck"; size: number }
  | { type: "new-turn" }
  | { type: "flip-card"; index: number };

export const newGameState = (size: number): GameState => ({
  numClicks: 0,
  numSolved: 0,
  deck: spawnDeck(size),
  solved: new Set(),
  flipped: new Set(),
  last: null,
  refresh: false,
  status: size ? "PLAY" : "NEW",
});

export const gameReducer = (state: GameState, action: Actions): GameState => {
  switch (action.type) {
    case "new-deck":
      return newGameState(action.size);
    case "new-turn":
      if (!state.refresh) return state;
      return { ...state, refresh: false, last: null, flipped: new Set() };
    case "flip-card":
      const selectedCard = state.deck[action.index];

      if (state.last?.id === selectedCard.id) return state;
      if (state.refresh) return state;
      if (state.solved.has(selectedCard.id)) return state;

      state.flipped.add(selectedCard.id);
      state.numClicks += 1;

      if (state.last?.emoji === selectedCard.emoji) {
        state.numSolved += 1;
        state.solved.add(state.last!.id);
        state.solved.add(selectedCard.id);
        state.flipped = new Set();
      }

      state.refresh = !(state.numClicks % 2);

      if (state.deck.every((d) => state.solved.has(d.id))) {
        state.status = "VICTORY";
      }

      return {
        ...state,
        last: selectedCard,
      };

    default:
      return state;
  }
};

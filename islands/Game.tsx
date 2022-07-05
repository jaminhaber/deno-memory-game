/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { useEffect, useReducer, useMemo } from "preact/hooks";
import { gameReducer, GameState, newGameState } from "../utils/reducer.ts";

export type GameProps = {
  width: number;
  height: number;
};

export default function Game({ width, height }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, newGameState(0));

  useEffect(() => dispatch({ type: "new-deck", size: width * height }), []);
  useEffect(() => {
    if (state.refresh) setTimeout(() => dispatch({ type: "new-turn" }), 500);
  }, [state, dispatch]);

  return (
    <div className={tw`h-full`}>
      <Navbar state={state} />

      <div
        className={tw`grid gap-2 h-5/6 w-full`}
        style={{
          gridTemplateColumns: `repeat(${width},1fr)`,
          gridTemplateRows: `repeat(${height},1fr)`,
        }}
      >
        {state.deck.map(({ id, emoji }, index) => {
          return (
            <Card
              flipped={state.flipped.has(id)}
              solved={state.solved.has(id)}
              onClick={() => dispatch({ type: "flip-card", index })}
              emoji={emoji}
            />
          );
        })}
      </div>
    </div>
  );
}

type CardProps = {
  flipped: boolean;
  solved: boolean;
  emoji: string;
  onClick: () => void;
};
const Card = ({ flipped, solved, emoji, onClick }: CardProps) => {
  const isFlipped = flipped || solved;

  const bgColor = (() => {
    if (solved) return "bg-green-600";
    if (flipped) return "bg-blue-500";
    return "bg-red-400";
  })();
  const className = tw`flex justify-center items-center hover:drop-shadow-md cursor-pointer ${bgColor}`;

  return (
    <div disabled={!IS_BROWSER} onClick={onClick} className={className}>
      <span className={tw`text-xl select-none`}>{isFlipped ? emoji : ""}</span>
    </div>
  );
};

type StatsProps = {
  state: GameState;
};
const Navbar = ({ state }: StatsProps) => {
  const sections = useMemo<h.JSX.Element[]>(() => {
    const stats = {
      clicks: state.numClicks,
      solved: state.numSolved,
    };
    return [
      <a href="/" className={tw`bg-gray-200 hover:bg-gray-400 px-2`}>
        Home
      </a>,
      <div className={tw`flex justify-center`}>
        {state.status === "VICTORY" && "Victory"}
      </div>,
      <div className={tw`flex justify-end gap-4`}>
        {Object.entries(stats).map(([k, v]) => {
          return (
            <div key={k}>
              <span>{k}: </span>
              {v}
            </div>
          );
        })}
      </div>,
    ];
  }, [state]);

  return (
    <div className={tw`mb-2 flex justify-between`}>
      {sections.map((s, i) => (
        <div key={i} className={tw`flex-1`}>
          {s}
        </div>
      ))}
    </div>
  );
};

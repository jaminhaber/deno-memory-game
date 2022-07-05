/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Head from "../islands/Head.tsx";

const sizes: [number, number][] = [
  [4, 4],
  [4, 5],
  [5, 6],
  [6, 6],
  [6, 7],
  [7, 8],
];

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Head />
      <h2 className={tw`text-2xl text-center mb-4 font-bold`}>Memory Game</h2>
      <div className={tw`flex flex-col gap-2`}>
        {sizes.map(([w, h]) => {
          const path = `${w}x${h}`;
          return (
            <div key={path}>
              <a
                className={tw`p-4 bg-red-300 hover:bg-red-500 block text-center	text-xl`}
                href={path}
              >
                {path}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

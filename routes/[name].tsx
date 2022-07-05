/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Game from "../islands/Game.tsx";

export default function Play({ params }: PageProps) {
  const [width, height] = params.name.split("x").map(Number);
  if (typeof width !== "number" || typeof height != "number") {
    throw Error("invalid with or height");
  }

  return (
    <div class={tw`mx-auto max-w-screen-md h-screen box-border`}>
      <div className={tw`p-4 pt-2 h-full box-border`}>
        <Game width={width} height={height} />
      </div>
    </div>
  );
}

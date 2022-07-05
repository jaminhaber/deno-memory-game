/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Game from "../islands/Game.tsx";
import Head from "../islands/Head.tsx";

export default function Play({ params }: PageProps) {
  const [width, height] = params.name.split("x").map(Number);
  if (typeof width !== "number" || typeof height != "number") {
    throw Error("invalid with or height");
  }
  if (width > 10 || height > 10) {
    throw Error("size is too large, go outside");
  }

  return (
    <div class={tw`mx-auto max-w-screen-md h-screen box-border`}>
      <Head />
      <div className={tw`p-4 pt-2 h-full box-border`}>
        <Game width={width} height={height} />
      </div>
    </div>
  );
}

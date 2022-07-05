/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export default function Seo() {
  return (
    <Head>
      <link rel="icon" href="/logo.png"></link>
      <title>Emoji Memory</title>
    </Head>
  );
}

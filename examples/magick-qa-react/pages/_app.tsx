import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MyElement } from "@jussmor/magickqa/my-element";
import React from "react";
// import "@jussmor/magickqa/my-element";
import { createComponent } from "@lit/react";

export const MyElementComponent = createComponent({
  tagName: "my-element",
  elementClass: MyElement,
  react: React,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyElementComponent name="earth"></MyElementComponent>
      {/* <my-element name="earth"></my-element> */}
      <Component {...pageProps} />
    </>
  );
}

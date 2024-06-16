import React from "react";
import type { Metadata } from "next";
import "animate.css";
import "./index.scss";
import { LotteryContextProvider } from "../store/Lottery-context";

export const metadata: Metadata = {
  title: "Lottery App",
  description: "Decentralized Lottery App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LotteryContextProvider>{children}</LotteryContextProvider>
      </body>
    </html>
  );
}

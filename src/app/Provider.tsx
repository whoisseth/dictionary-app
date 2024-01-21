/** @format */
"use client";

import React from "react";

import { ThemeProvider } from "next-themes";

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

import { cn } from "@/utils/cn";
import { fontAtom } from "./atom";
import { useAtom } from "jotai";
import { Inter, DM_Mono, Noto_Sans_Carian } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const dM_Mono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"] });
const noto_Sans_Carian = Noto_Sans_Carian({
  subsets: ["latin"],
  weight: ["400"]
});

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [font, setFont] = useAtom(fontAtom);
  // "sans serif" | "serif" | "mono";

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <body
          className={cn(
            "bg-white text-black  dark:bg-black/95 dark:text-white ",
            inter.className,
            font === "sans serif" && inter.className,
            font === "serif" && dM_Mono.className,
            font === "mono" && noto_Sans_Carian.className
          )}
        >
          {children}
        </body>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

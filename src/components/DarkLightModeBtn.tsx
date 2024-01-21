/** @format */

"use client";

import { useState } from "react";

import { useTheme } from "next-themes";
import { cn } from "@/utils/cn";
import { IoMoonOutline } from "react-icons/io5";

type Props = {};

export default function DarkLightModeBtn({}: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // const [dark, setDark] = useState(false);

  function toggleTheme() {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  }

  // a445ed
  return (
    <div className="flex gap-4 items-center">
      {/* dark and light btn  */}

      <button
        onClick={toggleTheme}
        className={cn(
          "flex h-5 w-10  bg-gray-500 hover:bg-purple  transition-all  cursor-pointer  items-center rounded-full p-1  ",
          { "bg-purple": theme == "dark" }
        )}
      >
        <div
          className={cn(
            "h-4 w-4 rounded-full bg-white transition-all dark:bg-very-dark-blue-bg",
            { "translate-x-full": theme === "dark" },
            { "translate-x-0": theme === "light" }
          )}
        />
      </button>
      <IoMoonOutline className="text-2xl text-gray-400 hover:text-purple" />
      {resolvedTheme}
    </div>
  );
}

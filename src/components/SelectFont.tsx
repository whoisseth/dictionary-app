/** @format */
"use client";

import { fontAtom } from "@/app/atom";
import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

type Props = {};

export default function SelectFont({}: Props) {
  // us
  const [font, setFont] = useAtom(fontAtom);

  const [isPopupOpen, setPopup] = useState(false);

  const ref = useOnclickOutside(() => {
    setPopup(false);
  });

  function togglePopup() {
    setPopup(!isPopupOpen);
  }

  const fonts = ["sans serif", "serif", "mono"];

  return (
    <div className="relative z-50">
      <button onClick={togglePopup}>Serif</button>

      {isPopupOpen && (
        <div
          ref={ref}
          className="flex absolute   items-start flex-col gap-3 shadow-lg px-6 py-3 rounded-md w-[150px] top-10 right-[-40px] bg-white dark:bg-slate-700 capitalize  "
        >
          {fonts.map((d, i) => (
            <button onClick={() => setFont(d)} className="capitalize" key={i}>
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

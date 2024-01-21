/** @format */

import React from "react";

import { IoIosSearch } from "react-icons/io";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="relative flex items-center  ">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search any word..."
        className=" placeholder:font-bold rounded-2xl outline-purple bg-gray-200 h-12  sm:h-[64px] w-full px-4 pr-12 dark:bg-slate-900 z-10"
      />
      {/* searh  */}

      <button className="absolute right-3  text-2xl sm:text-3xl text-purple/70">
        <IoIosSearch />
      </button>
    </form>
  );
}

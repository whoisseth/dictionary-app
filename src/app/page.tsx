/** @format */
"use client";

import DarkLightModeBtn from "@/components/DarkLightModeBtn";
import SearchBox from "@/components/SearchBox";
import SelectFont from "@/components/SelectFont";
import Image from "next/image";
import { RiBookLine } from "react-icons/ri";
import { IoIosPlay } from "react-icons/io";
import Link from "next/link";

import { FaExternalLinkAlt } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import Meaning from "@/components/Meaning";
import WordData, { ErrorResponse } from "./type";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("computer");

  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;

  const {
    isLoading,
    error,
    refetch,
    data: wordData
  } = useQuery<WordData[], ErrorResponse>({
    queryKey: ["wordData"],
    queryFn: () => fetch(api).then((res) => res.json())
  });

  const data: WordData | null = wordData ? wordData[0] : null;

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  const msg = new SpeechSynthesisUtterance();
  const speechHandler = (msg: SpeechSynthesisUtterance) => {
    msg.text = data?.word ?? "";
    window.speechSynthesis.speak(msg);
  };

  console.log("data-", data);

  console.log("error", error);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <main className="max-w-[689px] flex flex-col gap-10  mx-auto py-10  px-4 ">
        {/* header */}
        <div className="w-full flex justify-between">
          <RiBookLine className="text-4xl text-gray-400" />

          {/* <button>Dark</button> */}

          <div className=" flex gap-4 items-center">
            {/* <p>Sans serif</p> */}
            <SelectFont />
            <div className="h-[50px] w-[1px] bg-gray-400" />
            <DarkLightModeBtn />
          </div>
        </div>
        {/* search box */}
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handelSubmit}
          // onSubmit={(e)=>}
          value={searchValue}
        />

        {/* main */}

        {!data ? (
          <div className=" flex  flex-col gap-5 text-center">
            <p className="text-7xl">😕</p>
            <h2 className="text-xl font-bold">No Definitions Found</h2>
            <p className="text-lg">{`Sorry pal, we couldn't find definitions for the word you were looking for.`}</p>
          </div>
        ) : (
          <section className="flex flex-col gap-8">
            <section className="flex flex-col gap-1">
              {/* search item */}
              <div className="flex justify-between w-full">
                <h1 className="text-3xl  sm:text-[64px] font-bold">
                  {data?.word ?? ""}
                </h1>
                {/* play btn */}
                <button
                  onClick={() => speechHandler(msg)}
                  className=" group  h-16 w-16 rounded-full bg-purple/20 hover:bg-purple flex items-center justify-center text-4xl transition-all "
                >
                  <IoIosPlay className="text-purple  group-hover:text-white  transition-all" />
                </button>
              </div>
              {/* phonetic */}
              <p className="text-2xl text-purple">{data?.phonetic}</p>
            </section>
            {/* noune */}

            {data?.meanings.map((d, i) => (
              <Meaning
                key={i}
                antonyms={d.antonyms}
                definitions={d.definitions}
                partOfSpeech={d.partOfSpeech}
                synonyms={d.synonyms}
              />
            ))}
            {/* verb */}
            {/* <Meaning /> */}
            <hr />

            {/* Source */}

            {data?.sourceUrls && data?.sourceUrls.length > 0 ? (
              <div>
                <p>Source</p>

                <Link
                  target="_blank"
                  href={data?.sourceUrls[0]}
                  className="flex gap-1 items-center"
                >
                  {/* <span>https://en.wiktionary.org/wiki/computer</span> */}
                  <span>{data?.sourceUrls}</span>
                  <FaExternalLinkAlt className="text-sm text-gray-400" />{" "}
                </Link>
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}

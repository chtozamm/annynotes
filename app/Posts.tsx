"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

const characters = [
  "Anakin Skywalker",
  "Obi-Wan Kenobi",
  "Captain Jack Sparrow",
  "Jack Sparrow 2",
  "Jack Sparrow 3",
  "Frodo Baggins",
  "Samwise Gamgee",
  "Darth Vader",
  "Little Anakin",
  "Bilbo Baggins",
  "Indiana Jones",
  "Geralt of Rivia",
  "Gollum",
  "Guard",
  "Jar Jar",
  "Sherry",
  "Morton",
  "Aragorn",
  "Yoda",
  "Town's Guard",
];

type Post = {
  sender_name: string;
  message: string;
  id: string;
};

export default function Posts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://annynotes.pockethost.io/api/collections/posts/records?sort=-created&perPage=200",
    fetcher,
  );
  if (error) {
    return (
      <h2 className="lowercase font-['Ringbearer'] text-[#ffb220] font-bold text-2xl text-center py-8">
        Couldn&apos;t find any notes these time: refresh the page or try again
        later ✨
      </h2>
    );
  }
  if (isLoading) {
    return (
      <>
        <h2 className="lowercase font-['Ringbearer'] text-[#ffb220] font-bold text-2xl text-center py-8">
          Looking for notes...
        </h2>
        <ul className="w-full">
          <li className="h-48 pb-8 pt-4 px-4 md:px-8 text-center mb-8 border-t-2 break-words whitespace-pre-wrap rounded-2xl relative border-[#ffb220] bg-[#fffbf7] leading-6">
            <Image
              className="absolute top-[-0.9em] left-[calc(50%-12px)]"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
            />
          </li>
          <li className="h-48 pb-8 pt-4 px-4 md:px-8 text-center mb-8 border-t-2 break-words whitespace-pre-wrap rounded-2xl relative border-[#ffb220] bg-[#fffbf7] leading-6">
            <Image
              className="absolute top-[-0.9em] left-[calc(50%-12px)]"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
            />
          </li>
          <li className="h-48 pb-8 pt-4 px-4 md:px-8 text-center mb-8 border-t-2 break-words whitespace-pre-wrap rounded-2xl relative border-[#ffb220] bg-[#fffbf7] leading-6">
            <Image
              className="absolute top-[-0.9em] left-[calc(50%-12px)]"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
            />
          </li>
        </ul>
      </>
    );
  }
  let posts = data.items;
  posts = posts.filter((post: Post) =>
    searchParams.get("by")
      ? post.sender_name === searchParams.get("by")?.replaceAll("_", " ")
      : true
  );
  return (
    <>
      <h2 className="lowercase font-['Ringbearer'] text-[#ffb220] font-bold text-2xl text-center py-8">
        {searchParams.get("by")
          ? `From ${searchParams.get("by")?.replaceAll("_", " ")}:`
          : "Recent notes:"}
      </h2>
      <ul className="w-full">
        {posts.map((post: Post, idx: number) => (
          <li
            key={post.id}
            className="pb-8 pt-4 px-4 md:px-8 text-center mb-8 border-t-2 break-words whitespace-pre-wrap rounded-2xl relative border-[#ffb220] bg-[#fffbf7] leading-6"
          >
            <Image
              className="absolute top-[-0.9em] left-[calc(50%-12px)]"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
            />
            <p className="font-['Ringbearer'] text-lg text-[#ffb220] font-bold">
              Note #{posts.length - idx}
            </p>
            <span
              className="relative italic text-zinc-400 cursor-pointer"
              onClick={() =>
                router.push(
                  pathname + "?" +
                    createQueryString(
                      "by",
                      post.sender_name.replaceAll(" ", "_"),
                    ),
                )}
            >
              from {post.sender_name}
              {(characters.includes(post.sender_name))
                ? (
                  <Image
                    className="absolute top-0 right-[-1.75em]"
                    src={`/characters/${
                      post.sender_name.toLowerCase().replaceAll(" ", "-")
                        .replaceAll(
                          "'",
                          "",
                        )
                    }.png`}
                    width={20}
                    height={20}
                    alt=""
                  />
                )
                : null}
            </span>
            <p className="pt-4">{post.message}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

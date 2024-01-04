"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function Posts() {
  // NextJS hooks
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || null;

  // Call SWR to get records from database
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.items);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URL}?sort=-created&perPage=1000`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  // Determine the posts based on the current state
  const posts: Post[] =
    data?.filter((post: Post) =>
      from
        ? post.author.toLowerCase() === from.replaceAll("_", " ").toLowerCase()
        : true,
    ) || [];

  return (
    <>
      {isLoading && <Fallback />}
      {error && <Error />}
      {!isLoading && !error && (
        <>
          <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
            {from
              ? posts.length > 0
                ? `From ${from?.replaceAll("_", " ")}:`
                : `${from?.replaceAll("_", " ")} hasn't posted anything yet`
              : posts.length > 0
                ? "Recent notes:"
                : "Nothing has been posted yet"}
          </h2>
          <ul className="w-full">
            {posts?.map((post: Post, idx: number) => (
              <li
                key={post.id}
                className="relative mb-8 flex flex-col items-center whitespace-pre-wrap break-words rounded-2xl border-t-2 border-[#ffb220] bg-[#fffbf7] px-4 pb-8 pt-4 text-center leading-6 md:px-8"
              >
                <Image
                  className="pointer-events-none absolute left-[calc(50%-12px)] top-[-0.9em] select-none"
                  src="/icons/scroll.svg"
                  width={26}
                  height={26}
                  alt="scroll icon"
                />
                <span className="w-fit select-text font-['Ringbearer'] text-lg font-bold text-[#ffb220]">
                  Note #{posts.length - idx}
                </span>
                <button
                  className="flex select-text items-center gap-1.5 italic text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4"
                  onClick={() =>
                    router.push(
                      `${pathname}?from=${post.author
                        .replaceAll(" ", "_")
                        .toLowerCase()}`,
                    )
                  }
                >
                  <span>from {post.author}</span>
                  {characters.includes(post.author) ? (
                    <Image
                      className="pointer-events-none select-none"
                      src={`/characters/${post.author
                        .toLowerCase()
                        .replaceAll(" ", "-")
                        .replaceAll("'", "")}.png`}
                      width={20}
                      height={20}
                      alt=""
                    />
                  ) : null}
                </button>
                <p className="pt-4">{post.message}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

const Fallback = () => (
  <>
    <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
      Looking for notes...
    </h2>
    <ul className="w-full">
      {[0, 1, 2].map((_, i) => (
        <li
          key={i}
          className="relative mb-8 h-48 whitespace-pre-wrap break-words rounded-2xl border-t-2 border-[#ffb220] bg-[#fffbf7] px-4 pb-8 pt-4 text-center leading-6 md:px-8"
        >
          <Image
            className="absolute left-[calc(50%-12px)] top-[-0.9em]"
            src="/icons/scroll.svg"
            width={26}
            height={26}
            alt="scroll icon"
          />
        </li>
      ))}
    </ul>
  </>
);

const Error = () => (
  <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
);

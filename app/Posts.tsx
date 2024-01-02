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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // Call SWR to get records from database
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URL}?sort=-created&perPage=1000`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );
  // Handle SWR states
  if (isLoading) return <Fallback />;
  if (error) return <Error />;
  // Filter posts based on url search params
  const posts: Post[] = data?.items
    ?.filter((post: Post) =>
      searchParams?.get("from")
        ? post.author.toLowerCase() ===
          searchParams.get("from")?.replaceAll("_", " ").toLowerCase()
        : true,
    )
    .filter((post: Post) =>
      searchParams?.get("id") ? post.id === searchParams.get("id") : true,
    );
  return (
    <>
      <h2 className="py-8 text-center font-['Ringbearer'] text-2xl font-bold lowercase text-[#ffb220]">
        {!searchParams.get("id") &&
          (searchParams?.get("from") && posts?.length > 0
            ? `From ${searchParams.get("from")?.replaceAll("_", " ")}:`
            : searchParams?.get("from") &&
              `${searchParams
                .get("from")
                ?.replaceAll("_", " ")} hasn't posted anything yet`)}
        {!searchParams.get("id") &&
          (!searchParams?.get("from") && posts?.length > 0
            ? "Recent notes:"
            : !searchParams?.get("from") && "Nothing has been posted yet")}
        {searchParams.get("id") && "Chosen note:"}
      </h2>
      <ul className="w-full">
        {posts?.map((post, idx: number) => (
          <li
            key={post.id}
            className="relative mb-8 whitespace-pre-wrap break-words rounded-2xl border-t-2 border-[#ffb220] bg-[#fffbf7] px-4 pb-8 pt-4 text-center leading-6 md:px-8"
          >
            <Image
              className="absolute left-[calc(50%-12px)] top-[-0.9em]"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
            />
            <p
              className="mx-auto w-fit cursor-pointer font-['Ringbearer'] text-lg font-bold text-[#ffb220]"
              onClick={() => router.push(`${pathname}?id=${post.id}`)}
            >
              {searchParams.get("id") ? "Note" : `Note #${posts.length - idx}`}
            </p>
            <span
              className="relative cursor-pointer italic text-zinc-400"
              onClick={() =>
                router.push(
                  `${pathname}?from=${post.author
                    .replaceAll(" ", "_")
                    .toLowerCase()}`,
                )
              }
            >
              from {post.author}
              {characters.includes(post.author) ? (
                <Image
                  className="absolute right-[-1.75em] top-0"
                  src={`/characters/${post.author
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "")}.png`}
                  width={20}
                  height={20}
                  alt=""
                />
              ) : null}
            </span>
            <p className="pt-4">{post.message}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const Fallback = () => (
  <>
    {/* <button className="cursor-default uppercase py-4 max-w-sm w-full mx-auto rounded-xl font-black text-[0.75em] outline-none focus-visible:ring-2 focus-visible:ring-[#ffb220] focus-visible:ring-offset-4 bg-[#ffb220] text-white">
      Share
    </button> */}
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

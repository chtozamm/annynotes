import Image from "next/image";
import Link from "next/link";
import { characters } from "@/app/data";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <>
      <ul className="w-full">
        {posts?.map((post: Post, idx: number) => (
          <li
            key={post.id}
            className="relative mb-8 flex flex-col items-center rounded-2xl border-t-2 border-primary bg-secondary px-4 pb-8 pt-4 text-center leading-6 lg:px-8"
          >
            {/* Birthday theme: */}
            {/* <svg
              height="26"
              viewBox="0 0 24 24"
              shapeRendering="geometricPrecision"
              width="26"
              strokeWidth={1.5}
              className="pointer-events-none absolute left-[calc(50%-12px)] top-[-0.9em] select-none fill-white stroke-primary">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg> */}
            <Image
              className="pointer-events-none absolute left-[calc(50%-12px)] top-[-0.9em] select-none"
              src="/icons/scroll.svg"
              width={26}
              height={26}
              alt="scroll icon"
              priority
            />
            {/* {!post.verified && (
              <span className="absolute right-4 font-sans text-sm font-normal text-gray-400">
                not verified
              </span>
            )} */}
            <p className="w-full">
              <Link
                href={`/posts/${post.id}`}
                className="w-fit select-text font-ringbearer text-lg font-bold text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
              >
                {posts.length > 1 ? `Note #${posts.length - idx}` : "Note"}
              </Link>
            </p>
            <p className="flex w-full items-center justify-center">
              <Link
                href={`/authors/${post.author
                  .replaceAll(" ", "_")
                  .toLowerCase()}`}
                className="flex w-fit select-text items-center justify-center gap-1.5 italic text-zinc-400 outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4"
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
                    priority
                  />
                ) : null}
              </Link>
            </p>
            <p className="mt-4 w-full whitespace-pre-wrap text-balance break-words">
              {post.message}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

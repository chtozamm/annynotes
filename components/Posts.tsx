/* A list of posts
----------------------------
         Note #1
    from Bilbo Baggins

  Let the adventure begin...
---------------------------- */

import Image from "next/image";
import Link from "next/link";
import { characters } from "@/app/data";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <ul className="w-full">
      {posts.map((post: Post, idx: number) => (
        <li
          key={post.id}
          className="relative mb-8 flex flex-col items-center rounded-2xl border-t-2 border-primary bg-secondary px-4 pb-8 pt-4 text-center leading-6 lg:px-8"
        >
          <Image
            className="pointer-events-none absolute left-[calc(50%-12px)] top-[-0.9em] select-none"
            src="/icons/scroll.svg"
            width={26}
            height={26}
            alt="Scroll icon"
            priority
          />
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
              from {post.author}
              {characters.includes(post.author) ? (
                <Image
                  className="pointer-events-none select-none"
                  src={`/characters/${post.author
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "")}.png`}
                  width={20}
                  height={20}
                  alt={`Picture of ${post.author}`}
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
  );
}

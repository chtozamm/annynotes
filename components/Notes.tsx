/* A list of notes
----------------------------
         Note #1
    from Bilbo Baggins

  Let the adventure begin...
---------------------------- */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { characters } from "@/app/data";

export default function Notes({ notes }: { notes: Note[] }) {
  const pathname = usePathname();
  return (
    <ul className="w-full">
      {notes.map((note: Note, idx: number) => (
        <li
          key={note.id}
          className="relative mb-8 flex flex-col items-center rounded-2xl border-t-2 border-primary bg-secondary px-4 pb-8 pt-4 text-center leading-6 lg:px-8"
        >
          {/* Birthday theme: */}
          {/* <svg
            height="26"
            width="26"
            viewBox="0 0 24 24"
            shapeRendering="geometricPrecision"
            strokeWidth={1.5}
            className="pointer-events-none absolute left-[calc(50%-12px)] top-[-1em] select-none fill-white stroke-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
            />
          </svg> */}
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
              href={`/notes/${note.id}`}
              className={`${pathname.startsWith("/notes/") ? "pointer-events-none" : ""} w-fit select-text font-ringbearer text-lg font-bold text-primary outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4`}
            >
              {notes.length > 1 || pathname === "/"
                ? `Note #${notes.length - idx}`
                : "Note"}
            </Link>
          </p>
          <p className="flex w-full items-center justify-center">
            <Link
              href={`/authors/${note.author
                .replaceAll(" ", "_")
                .toLowerCase()}`}
              className={`${pathname.startsWith("/authors/") ? "pointer-events-none" : ""} flex w-fit select-text items-center justify-center gap-1.5 italic text-zinc-400 outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:ring-offset-4`}
            >
              from {note.author}
              {/* {characters.includes(note.author) ? (
                <Image
                  className="pointer-events-none select-none"
                  src={`/characters/${note.author
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("'", "")}.png`}
                  width={20}
                  height={20}
                  alt={`Picture of ${note.author}`}
                  priority
                />
              ) : null} */}
            </Link>
          </p>
          <p className="mt-4 w-full whitespace-pre-wrap text-balance break-words">
            {note.message}
          </p>
        </li>
      ))}
    </ul>
  );
}

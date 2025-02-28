import Image from "next/image";
import Link from "next/link";
import { characters } from "@/app/data";
import { Note } from "@/app/types";

export default function Notes({ notes }: { notes: Note[] }) {
  return (
    <ul className="w-full">
      {notes.map((note: Note, idx: number) => (
        <li
          key={note.id}
          className="border-primary bg-secondary relative mb-8 flex flex-col items-center rounded-2xl border-t-2 px-4 pt-4 pb-8 text-center leading-6 lg:px-8"
        >
          <Image
            className="pointer-events-none absolute top-[-0.9em] left-[calc(50%-12px)] select-none"
            src="/icons/scroll.svg"
            width={26}
            height={26}
            alt="Scroll icon"
            priority
          />
          <p className="w-full">
            <Link
              href={`/notes/${note.id}`}
              className="font-ringbearer text-primary lg:focus-visible:ring-primary w-fit text-lg font-bold outline-none select-text active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
            >
              {notes.length > 1 ? `Note #${notes.length - idx}` : "Note"}
            </Link>
          </p>
          <p className="flex w-full items-center justify-center">
            <Link
              href={`/authors/${note.author
                .replaceAll(" ", "_")
                .toLowerCase()}`}
              className="lg:focus-visible:ring-primary flex w-fit items-center justify-center gap-1.5 text-zinc-400 italic outline-none select-text active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
            >
              from {note.author}
              {characters.includes(note.author) ? (
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
              ) : null}
            </Link>
          </p>
          <p className="mt-4 w-full text-balance break-words whitespace-pre-wrap">
            {note.message}
          </p>
        </li>
      ))}
    </ul>
  );
}

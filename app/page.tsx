import Notes from "@/components/notes";
import LinkButton from "@/components/link-button";
import { Note } from "./types";

export default async function Home() {
  const notes: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return (
    <>
      <LinkButton label="Share" />
      {notes.length > 0 ? (
        <>
          <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
            {notes.length > 0
              ? "Recent notes:"
              : "Someone has stolen all the notes! Try to reload the page to try to get them back"}
          </h2>
          <Notes notes={notes} />
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

const Error = () => (
  <div className="border-primary bg-secondary my-8 flex w-fit items-center justify-center rounded-xl border px-4 py-4">
    <p className="mx-2 text-center text-sm text-zinc-400">
      Someone has stolen all the notes!
      <br />
      Try to reload the page to get them back
    </p>
    <span className="text-3xl">🦉</span>
  </div>
);

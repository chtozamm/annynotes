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
      {notes?.length > 0 ? (
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
  <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
);

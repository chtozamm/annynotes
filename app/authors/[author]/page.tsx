import Notes from "@/components/notes";
import LinkButton from "@/components/link-button";
import { Note } from "@/app/types";

// Return a list of `params` to populate the [author] dynamic segment
export async function generateStaticParams() {
  const notes: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);

  return notes.map((note) => ({
    author: note.author.toLowerCase().replaceAll(" ", "_"),
  }));
}

export default async function Home({
  params: { author },
}: {
  params: { author: string };
}) {
  const authorName = author.replaceAll("_", " "); // formatted name
  const notes: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) =>
      (data.items as Note[]).filter(
        (note) => note.author.toLowerCase() === authorName,
      ),
    );
  return (
    <>
      <LinkButton label="Share" />
      <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
        {notes.length > 0
          ? `From ${authorName}:`
          : `${authorName} hasn't noteed anything yet`}
      </h2>
      <Notes notes={notes} />
    </>
  );
}

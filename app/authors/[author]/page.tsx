import Notes from "@/components/notes";
import LinkButton from "@/components/link-button";
import { Note } from "@/app/types";
import { normalizeName } from "@/app/utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ author: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = (await params).author;
  const authorName = normalizeName(author);
  return {
    title: `Notes from ${authorName} - Annynotes ✨`,
  };
}

/** Return a list of `params` to populate the [author] dynamic segment. */
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
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const author = (await params).author;
  const authorName = normalizeName(decodeURIComponent(author));
  const notes: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL +
      `?sort=-created&perPage=1000&filter=(author="${authorName}")`,
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) =>
      (data.items as Note[])?.filter((note) => note.author == authorName),
    );
  if (!notes) {
    return <Error authorName={authorName} />;
  }
  return (
    <>
      <LinkButton label="Share" />
      <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
        {notes.length > 0
          ? `From ${authorName}:`
          : `${authorName} hasn't posted anything yet`}
      </h2>
      <Notes notes={notes} />
    </>
  );
}

const Error = ({ authorName }: { authorName: string }) => (
  <div className="border-primary bg-secondary my-8 flex w-fit items-center justify-center rounded-xl border px-4 py-4">
    <p className="mx-2 text-center text-sm text-zinc-400">
      {`Someone has stolen ${authorName}'s notes!`}
      <br />
      Try to reload the page to get them back
    </p>
    <span className="text-3xl">🦉</span>
  </div>
);

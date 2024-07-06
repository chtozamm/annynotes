import Notes from "@/components/Notes";
import LinkButton from "@/components/LinkButton";
import Header from "@/components/Header";
import { fetchNotes } from "@/lib/actions";
import { Metadata } from "next";
import { normalizeName } from "@/lib/utils";

type Props = {
  params: { author: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const authorName = normalizeName(params.author);
  return {
    title: `Notes from ${authorName} - Annynotes ✨`,
  };
}

// Return a list of `params` to populate the [author] dynamic segment
export async function generateStaticParams() {
  const notes: Note[] = await fetch("http://localhost:3000/?sort=desc", {
    next: { tags: ["notes"] },
  }).then((res) => res.json());

  return notes.map((note) => ({
    author: note.author.toLowerCase().replaceAll(" ", "_"),
  }));
}

export default async function Home({ params }: Props) {
  const authorName = normalizeName(params.author);
  const notes = (await fetchNotes()).filter(
    (note) =>
      note.author.toLocaleLowerCase() === authorName.toLocaleLowerCase(),
  );
  return (
    <>
      <Header />
      <LinkButton label="Share" />
      <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        {notes.length > 0
          ? `From ${authorName}:`
          : `${authorName} hasn't posted anything yet`}
      </h2>
      <Notes notes={notes} />
    </>
  );
}

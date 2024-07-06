import Notes from "@/components/Notes";
import LinkButton from "@/components/LinkButton";
import Header from "../components/Header";
import { fetchNotes } from "@/lib/actions";

export default async function Home() {
  const notes = await fetchNotes();

  return (
    <>
      <Header />
      <LinkButton label="Share" />
      {notes.length > 0 ? (
        <>
          <h2 className="my-8 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
            {notes.length > 0
              ? "Recent notes:"
              : "Someone has stolen all the notes! Try to reload the page to get them back"}
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
  <div className="my-8 flex w-fit items-center justify-center rounded-xl border border-primary bg-secondary px-4 py-4">
    <p className="mx-2 text-center text-sm text-zinc-400">
      Someone has stolen all the notes!
      <br />
      Try to reload the page to get them back
    </p>
    <span className="text-3xl">🦉</span>
  </div>
);

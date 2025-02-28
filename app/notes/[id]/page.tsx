import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Notes from "@/components/notes";
import LinkButton from "@/components/link-button";
import { Note } from "@/app/types";

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const data: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);

  return data.map((note) => ({
    id: note.id as string,
  }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data: Note[] = await fetch(
    process.env.NEXT_PUBLIC_DB_URL + "?sort=-created&perPage=1000",
    { next: { tags: ["notes"] } },
  )
    .then((res) => res.json())
    .then((data) => data.items);

  // Filter notes based on the search params
  const notes = data.filter((note) => note.id === id);

  // const [_, userId, __] = await getSession()
  return (
    <>
      <LinkButton label="Share" />
      {data.length > 0 ? (
        <Suspense fallback={<Fallback />}>
          {id && notes[0]?.id ? (
            <>
              <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
                Selected note:
              </h2>
              <Notes notes={notes} />
              {/* {userId === notes[0]?.user_id && ( */}
              <div className="flex w-full flex-col gap-4">
                <Link
                  href={`/notes/edit/${id}`}
                  className="bg-primary lg:focus-visible:ring-primary mx-auto w-full max-w-sm rounded-xl py-4 text-center text-[0.75em] font-black text-white uppercase outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
                >
                  Edit
                </Link>
                <Link
                  href={`/notes/delete/${id}`}
                  className="border-primary text-primary lg:focus-visible:ring-primary mx-auto w-full max-w-sm rounded-xl border-2 bg-white py-4 text-center text-[0.75em] font-black uppercase outline-none active:opacity-75 lg:hover:opacity-75 lg:focus-visible:ring-2 lg:focus-visible:ring-offset-4"
                >
                  Delete
                </Link>
              </div>
              {/* )} */}
            </>
          ) : (
            <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
              Note doesn&apos;t exist
            </h2>
          )}
        </Suspense>
      ) : (
        <Error />
      )}
    </>
  );
}

const Fallback = () => (
  <>
    <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
      Looking for notes...
    </h2>
    <ul className="w-full">
      {[0, 1, 2].map((_, i) => (
        <li
          key={i}
          className="border-primary bg-secondary relative mb-8 h-48 rounded-2xl border-t-2 px-4 pt-4 pb-8 text-center leading-6 break-words whitespace-pre-wrap lg:px-8"
        >
          <Image
            className="absolute top-[-0.9em] left-[calc(50%-12px)]"
            src="/icons/scroll.svg"
            width={26}
            height={26}
            alt="scroll icon"
          />
        </li>
      ))}
    </ul>
  </>
);

const Error = () => (
  <h2 className="font-ringbearer text-primary my-8 w-full text-center text-2xl font-bold lowercase">
    Couldn&apos;t find any notes these time: refresh the page or try again later
    ✨
  </h2>
);

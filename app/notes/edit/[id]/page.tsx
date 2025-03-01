import { validateId } from "@/app/utils";
import UpdateForm from "@/components/update-form";
import { Note } from "@/app/types";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (validateId(id)) {
    const note: Note = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
      cache: "no-store",
    }).then((res) => res.json());

    return (
      <>
        <h2 className="font-ringbearer text-primary mt-2 w-full text-center text-2xl font-bold lowercase">
          Edit note
        </h2>
        <p className="mb-4 text-sm text-zinc-400">Change name or message</p>
        <UpdateForm note={note} />
      </>
    );
  } else {
    notFound();
  }
}

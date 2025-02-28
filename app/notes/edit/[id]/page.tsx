import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { getSession } from "@/app/lib";
import { validateId } from "@/app/utils";
import UpdateForm from "@/components/update-form";
import { Note } from "@/app/types";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (validateId(id)) {
    const note: Note = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
      cache: "no-store",
    }).then((res) => res.json());

    if (note.message === "The requested resource wasn't found.") {
      revalidateTag("notes");
      redirect("/");
    }

    const [token, userId] = await getSession();
    if (token == "") redirect("/signin");
    if (userId !== note.user_id) redirect("/");

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
    return <p>Invalid note id</p>;
  }
}

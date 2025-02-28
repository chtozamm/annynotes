import { getSession } from "@/app/lib";
import { Note } from "@/app/types";
import { validateId } from "@/app/utils";
import DeleteForm from "@/components/delete-form";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const note: Note = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
    cache: "no-store",
  }).then((res) => res.json());
  const [, userId] = await getSession();
  // TODO: Return a message "unauthorized" with
  // visible timer and redirect after 3 seconds
  if (userId !== note.user_id) redirect("/");
  if (validateId(id)) {
    return <DeleteForm id={id} />;
  } else {
    return <p>Invalid note id</p>;
  }
}

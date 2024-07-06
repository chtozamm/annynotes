// import { getSession } from "@/app/lib";
import { validateId } from "@/lib/utils";
import DeleteForm from "./DeleteForm";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  // const note: Note = await fetch("http://localhost:3000" + "/" + id, {
  //   cache: "no-store",
  // }).then((res) => res.json());
  // const [_, userId, __] = await getSession();
  // TODO: Return a message "unauthorized" with
  // visible timer and redirect after 3 seconds
  // if (userId !== note.user_id) redirect("/");
  // const validId = validateId(id);
  return (
    <>
      <Header />
      {/* {validId ?  : <p>Invalid note id</p>} */}
      <DeleteForm id={id} />
    </>
  );
}

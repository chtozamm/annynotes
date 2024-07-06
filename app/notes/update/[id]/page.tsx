// import { getSession } from "@/app/lib";
// import { validateId } from "@/app/utils";
import UpdateForm from "./UpdateForm";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { fetchNotes } from "@/lib/actions";
import Header from "@/components/Header";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  // if (validateId(id)) {
  const note = (await fetchNotes()).filter((note) => note.id === params.id)[0];
  // const note: Note = await fetch(process.env.DB_URL + params.id, {
  //   cache: "no-store",
  // }).then((res) => res.json());

  //   const [_, userId, __] = await getSession();
  //   if (userId !== post.user_id) redirect("/");

  //   if (post.message === "The requested resource wasn't found.") {
  //     revalidateTag("posts");
  //     redirect("/");
  //   }

  return (
    <>
      <Header />
      <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
        Edit note
      </h2>
      <p className="mb-4 text-sm text-zinc-400">Change name or message</p>
      <UpdateForm note={note} />
    </>
  );
  // } else {
  //   return <p>Invalid post id</p>;
  // }
}

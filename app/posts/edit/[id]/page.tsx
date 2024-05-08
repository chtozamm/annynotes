import { getSession } from "@/app/lib";
import { validateId } from "@/app/utils";
import UpdateForm from "@/components/UpdateForm";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (validateId(id)) {
    const post: Post = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
      cache: "no-store",
    }).then((res) => res.json());

    const [_, userId, __] = await getSession();
    if (userId !== post.user_id) redirect("/");

    if (post.message === "The requested resource wasn't found.") {
      revalidateTag("posts");
      redirect("/");
    }

    return (
      <>
        <h2 className="mt-2 w-full text-center font-ringbearer text-2xl font-bold lowercase text-primary">
          Edit note
        </h2>
        <p className="mb-4 text-sm text-zinc-400">Change name or message</p>
        <UpdateForm post={post} />
      </>
    );
  } else {
    return <p>Invalid post id</p>;
  }
}

import { getSession } from "@/app/lib";
import { validateId } from "@/app/utils";
import DeleteForm from "@/components/DeleteForm";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const post: Post = await fetch(process.env.NEXT_PUBLIC_DB_URL + "/" + id, {
    cache: "no-store",
  }).then((res) => res.json());
  const [_, userId, __] = await getSession();
  // TODO: Return a message "unauthorized" with
  // visible timer and redirect after 3 seconds
  if (userId !== post.user_id) redirect("/");
  if (validateId(id)) {
    return <DeleteForm id={id} />;
  } else {
    return <p>Invalid post id</p>;
  }
}

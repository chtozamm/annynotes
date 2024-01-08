import { validateId } from "@/app/utils";
import UpdateForm from "./UpdateForm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { id: string } }) {
  if (validateId(params.id)) {
    const post: Post = await fetch(
      process.env.NEXT_PUBLIC_DB_URL + "/" + params.id,
      { cache: "no-store" },
    ).then((res) => res.json());

    if (post.message === "The requested resource wasn't found.") {
      revalidatePath("/");
      redirect("/");
    }

    return <UpdateForm post={post} />;
  } else {
    return <p>Invalid id</p>;
  }
}
